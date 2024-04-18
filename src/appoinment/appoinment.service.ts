import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Appoinment, PackageExpiredStatus } from './entities/appoinment.entity';
import { AppoinmentQuery } from './appoinmentQuery/appoinmentQuery';
import { CreateAppoinmentDto } from './dto/create-appoinment.dto';
import { Package } from 'src/package/entities/package.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import { UserService } from 'src/user/user.service';
const schedule = require('node-schedule');
import { format } from 'date-fns';
import { PlanService } from 'src/plan/plan.service';
import { PackageService } from 'src/package/package.service';
import { DoctorService } from 'src/doctor/doctor.service';
import { Notification } from 'src/notifications/entities/notification.entity';
import { PatientNotification } from 'src/notifications/entities/patient-notification.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class AppoinmentService {
  constructor(
    private readonly notificationsService: NotificationsService,
    @InjectModel(Appoinment.name)
    private appoinmentModel: mongoose.Model<Appoinment>,
    @InjectModel(Package.name)
    private packageModel: mongoose.Model<Package>,
    @InjectModel(Notification.name)
    private notificationModel: mongoose.Model<Notification>,
    @InjectModel(PatientNotification.name)
    private patientNotificationModel: mongoose.Model<PatientNotification>,
    @InjectModel(Doctor.name)
    private DoctorModel: mongoose.Model<Doctor>,
    private readonly userService: UserService,
    private readonly planService: PlanService,
    private readonly packageService: PackageService,
    private readonly doctorService: DoctorService,
  ) {}

  async create(
    userId: string,
    postAppoinment: CreateAppoinmentDto,
  ): Promise<Appoinment> {
    const randomPart = Math.floor(Math.random() * 10000);
    const appointmenUniqueId = `${randomPart.toString().padStart(6, '0')}`;
    const createdAppoinment = new this.appoinmentModel({
      ...postAppoinment,
      userId,
      appointmentId: appointmenUniqueId,
    });
    const savedAppoinment = await createdAppoinment.save();
    const user = await this.userService.findById(userId);
    const formattedAppointmentDate = format(
      new Date(savedAppoinment.createdAt),
      'd MMMM yyyy',
    );
    // appointment, oneTime, or package  when buying to send a notification to the doctor
    if (postAppoinment.type === 'appointment') {
      const notificationData = new this.notificationModel({
        title: `You have a new appointment`,
        notificationBody: `${user.name} booked an appointment on ${formattedAppointmentDate} at ${savedAppoinment.visitPatientHours}. Please be on time for our appointment.`,
        data: `${user.name} booked an appointment on ${formattedAppointmentDate} at ${savedAppoinment.visitPatientHours}. Please be on time for our appointment.`,
        doctorId: savedAppoinment.doctorId,
        userId: userId,
        type: 'appointment',
      });
      await notificationData.save();
      await this.notificationsService.sendNotification(
        postAppoinment.doctorId.toString(),
        notificationData,
      );
    } else if (postAppoinment.type === 'package') {
      const packageId = savedAppoinment.packageId.toString();
      const getSinglePackage = await this.packageService.findById(packageId);
      const planId = getSinglePackage.plan.toString();
      const plan = await this.planService.findById(planId);

      const notificationData = new this.notificationModel({
        title: `You have a new clients`,
        notificationBody: `${user.name} purchased a ${savedAppoinment.expiredDuration} Months ${plan.title_en} Package under you! Click to see details.`,
        data: `${user.name} purchased a ${savedAppoinment.expiredDuration} Months ${plan.title_en} Package under you! Click to see details.`,
        doctorId: savedAppoinment.doctorId,
        userId: userId,
        type: 'package',
      });
      await notificationData.save();
      await this.notificationsService.sendNotification(
        postAppoinment.doctorId.toString(),
        notificationData,
      );

      const monthToDays = savedAppoinment.expiredDuration * 30;
      const daysToMilliseconds = monthToDays * 24 * 60 * 60 * 1000;
      const expirationTime = new Date(Date.now() + daysToMilliseconds);

      const expTime = schedule.scheduleJob(expirationTime, async () => {
        try {
          await this.updatePackageExpired(savedAppoinment._id);
        } catch (error) {
          console.error('Error updating package expiration:', error);
        }
      });
    }

    return savedAppoinment;
  }

  private async updatePackageExpired(appoinmentId: string): Promise<void> {
    await this.appoinmentModel.findByIdAndUpdate(
      appoinmentId,
      { packageExpired: PackageExpiredStatus.EXPIRED, status: 'complete' },
      { new: true },
    );
    const appoinment = this.appoinmentModel.findOne({ _id: appoinmentId });
    const userId = (await appoinment).userId.toString();
    const user = await this.userService.findById(userId);
    const packageId = await (await appoinment).packageId.toString();
    const getSinglePackage = await this.packageService.findById(packageId);
    const planId = getSinglePackage.plan.toString();
    const plan = await this.planService.findById(planId);

    const notificationData = new this.notificationModel({
      title: `You'r package complete.`,
      notificationBody: `${user.name} You'r ${
        (await appoinment).expiredDuration
      } Months ${plan.title_en} Package complete! Click to see details.`,
      data: `${user.name} You'r ${(await appoinment).expiredDuration} Months ${
        plan.title_en
      } Package complete! Click to see details.`,
      doctorId: (await appoinment).doctorId,
      userId: userId,
      type: 'package',
    });
    await notificationData.save();
    await this.notificationsService.sendNotification(userId, notificationData);
  }

  async findAppoinment(_id: string): Promise<Appoinment> {
    const appoinment = this.appoinmentModel.findOne({ _id });
    return appoinment;
  }

  async findAll(
    userId?: string,
    role?: string,
    queryOptions?: AppoinmentQuery,
  ): Promise<Appoinment[]> {
    let query;

    if (role === 'doctor') {
      query = this.appoinmentModel.find({ doctorId: userId });
    } else {
      query = this.appoinmentModel.find({ userId: userId });
    }

    if (queryOptions.packageId) {
      query = query.where('packageId').equals(queryOptions.packageId);
    }
    if (queryOptions.planId) {
      const packageIds = await this.packageModel
        .find({ plan: queryOptions.planId })
        .distinct('_id');
      query = query.where('packageId').in(packageIds);
    }

    if (queryOptions?.type) {
      query = query.where('type').equals(queryOptions.type);
    }
    if (queryOptions.packageExpired) {
      query = query.where('packageExpired').equals(queryOptions.packageExpired);
    }
    if (queryOptions.status) {
      query = query.where('status').equals(queryOptions.status);
    }

    const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
    query = query.skip(startIndex).limit(queryOptions?.limit);

    if (queryOptions?.sortBy && queryOptions?.sortOrder) {
      query = query.sort({
        [queryOptions.sortBy]: queryOptions.sortOrder === 'desc' ? -1 : 1,
      });
    }

    const appoinment = await query.exec();
    return appoinment;
  }

  async findAllAppoinment(
    queryOptions?: AppoinmentQuery,
  ): Promise<Appoinment[]> {
    let query;

    query = this.appoinmentModel.find();

    if (queryOptions.packageId) {
      query = query.where('packageId').equals(queryOptions.packageId);
    }
    if (queryOptions.doctorId) {
      query = query.where('doctorId').equals(queryOptions.doctorId);
    }
    if (queryOptions.userId) {
      query = query.where('userId').equals(queryOptions.userId);
    }
    if (queryOptions.planId) {
      const packageIds = await this.packageModel
        .find({ plan: queryOptions.planId })
        .distinct('_id');
      query = query.where('packageId').in(packageIds);
    }

    if (queryOptions?.type) {
      query = query.where('type').equals(queryOptions.type);
    }
    if (queryOptions.packageExpired) {
      query = query.where('packageExpired').equals(queryOptions.packageExpired);
    }
    if (queryOptions.status) {
      query = query.where('status').equals(queryOptions.status);
    }

    const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
    query = query.skip(startIndex).limit(queryOptions?.limit);

    if (queryOptions?.sortBy && queryOptions?.sortOrder) {
      query = query.sort({
        [queryOptions.sortBy]: queryOptions.sortOrder === 'desc' ? -1 : 1,
      });
    }

    const appoinment = await query.exec();
    console.log(appoinment.length);

    return appoinment;
  }

  async findById(id: string): Promise<Appoinment> {
    const getSingleAppoinment = await this.appoinmentModel.findById(id);
    if (!getSingleAppoinment) {
      throw new NotFoundException('getSingleAppoinment not found');
    }
    return getSingleAppoinment;
  }

  async updateById(
    id: string,
    updateAppointmentDto: UpdateAppoinmentDto,
  ): Promise<Appoinment> {
    try {
      console.log('updateAppointmentDto', updateAppointmentDto);
      const appointment = await this.appoinmentModel.findById(id);

      if (!appointment) {
        throw new Error('Appointment not found');
      }

      const { doctorId, userId } = appointment;
      const [doctor, user] = await Promise.all([
        this.doctorService.findById(doctorId),
        this.userService.findById(userId),
      ]);

      const { doctorAdvice } = updateAppointmentDto;
      if (appointment.type === 'package' && doctorAdvice) {
        const getSinglePackage = await this.packageService.findById(
          appointment.packageId,
        );
        const planId = getSinglePackage.plan.toString();
        const plan = await this.planService.findById(planId);
        const updatedAppointment = await this.appoinmentModel.findByIdAndUpdate(
          id,
          { $set: { ...updateAppointmentDto } },
          {
            new: true,
            runValidators: true,
          },
        );

        const newDoctorAdviceIndex = updatedAppointment.doctorAdvice.length - 1;

        const patientPackageNotificationData =
          new this.patientNotificationModel({
            title: `New advice in your package!`,
            notificationBody: `${doctor.name_en} added new advice & necessary attachment to your ${appointment.expiredDuration} Months ${plan.title_en} package. Click here to see.`,
            data: `${doctor.name_en} added new advice & necessary attachment to your  ${appointment.expiredDuration} Months ${plan.title_en} package. Click here to see.`,
            doctorId: doctor._id,
            userId: user._id,
            type: 'package',
          });

        await patientPackageNotificationData.save();
        await this.notificationsService.sendNotification(
          user._id.toString(),
          patientPackageNotificationData,
        );

        return updatedAppointment;
      } else if (
        ['appointment', 'onetime', 'followup'].includes(appointment.type) &&
        doctorAdvice
      ) {
        const doctorAdviceObj = doctorAdvice[0];
        const { details, followUpDate } = doctorAdviceObj;

        if (details !== null && followUpDate !== null) {
          const formattedFollowUpDate = format(
            new Date(followUpDate),
            'd MMMM yyyy',
          );
          const updatedAppointment =
            await this.appoinmentModel.findByIdAndUpdate(
              id,
              { $set: { ...updateAppointmentDto, status: 'complete' } },
              {
                new: true,
                runValidators: true,
              },
            );
          const notificationData = new this.patientNotificationModel({
            title: `You have a Follow-Up consultation!`,
            notificationBody: `You have a Follow-up consultation with ${doctor.name_en} on ${formattedFollowUpDate}. Don't miss it! Your health is our priority.`,
            data: `You have a Follow-up consultation with ${doctor.name_en} on ${formattedFollowUpDate}. Don't miss it! Your health is our priority.`,
            doctorId: doctor._id,
            userId: user._id,
            type: 'followup',
          });
          await notificationData.save();

          await this.notificationsService.sendNotification(
            user._id.toString(),
            notificationData,
          );

          return updatedAppointment;
        } else if (details !== null && followUpDate === null) {
          const updatedAppointment =
            await this.appoinmentModel.findByIdAndUpdate(
              id,
              { $set: { ...updateAppointmentDto, status: 'complete' } },
              { new: true, runValidators: true },
            );
          const notificationData = new this.patientNotificationModel({
            title: `See your advice!`,
            notificationBody: `${doctor.name_en} shared advice & necessary attachment with you. Click here to see.`,
            data: `${doctor.name_en} shared advice & necessary attachment with you. Click here to see.`,
            doctorId: doctor._id,
            userId: user._id,
            type: 'advice',
          });
          await notificationData.save();
          await this.notificationsService.sendNotification(
            user._id.toString(),
            notificationData,
          );
          return updatedAppointment;
        }
      }
    } catch (error) {
      throw new Error(`Error updating appointment: ${error.message}`);
    }
  }

  async updateAppointmentStatus(
    id: string,
    newStatus: string,
  ): Promise<Appoinment> {
    return this.appoinmentModel
      .findByIdAndUpdate(id, { status: newStatus }, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<Appoinment> {
    try {
      const deletedAppoinment =
        await this.appoinmentModel.findByIdAndDelete(id);

      if (deletedAppoinment) {
        return deletedAppoinment;
      } else {
        throw new NotFoundException('Appoinment not found');
      }
    } catch (error) {
      throw new NotFoundException('Error deleting Appoinment');
    }
  }

  async findDoctorInfo(userId?: string): Promise<{
    length: {
      packages: number;
      onetimes: number;
      appointments: number;
      followups: number;
      totalEarn: number;
      totalPatientSeen: number;
    };
  }> {
    try {
      const packageAppointments = await this.appoinmentModel.find({
        doctorId: userId,
        type: 'package',
        status: 'paid',
      });

      const onetimeAppointments = await this.appoinmentModel.find({
        doctorId: userId,
        type: 'onetime',
        status: 'paid',
      });

      const appointmentAppointments = await this.appoinmentModel.find({
        doctorId: userId,
        type: 'appointment',
        status: 'paid',
      });

      const followupAppointments = await this.appoinmentModel.find({
        doctorId: userId,
        type: 'followup',
        status: 'paid',
      });

      const completeAppointments = await this.appoinmentModel.find({
        doctorId: userId,
        status: 'complete',
      });
      const totalCompleteAppointments = completeAppointments.length;

      await this.DoctorModel.findByIdAndUpdate(
        userId,
        { $set: { totalPatientSeen: totalCompleteAppointments } },
        { new: true, runValidators: true },
      );
      const doctorData = await this.doctorService.findById(userId);
      const totalEarn = doctorData.totalEarn;
      const totalPatientSeen = doctorData.totalPatientSeen;
      const packageOrOnetime =
        packageAppointments.length + onetimeAppointments.length;

      const appointmentLength = {
        packages: packageAppointments.length,
        onetimes: onetimeAppointments.length,
        appointments: appointmentAppointments.length,
        followups: followupAppointments.length,
        packageOrOnetime,
        totalEarn,
        totalPatientSeen,
      };

      return {
        length: appointmentLength,
      };
    } catch (error) {
      // Handle any errors that might occur during the database query
      console.error('Error fetching appointments:', error);
    }
  }
}
