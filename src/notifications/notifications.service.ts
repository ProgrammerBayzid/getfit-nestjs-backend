import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './entities/notification.entity';
import mongoose from 'mongoose';
import * as firebase from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { CreateDoctorRequestNotificationDto } from './dto/create-call-request-to-doctor.dto';
import { CallingNotificationDto } from './dto/calling-notification-dto';
import { UserService } from 'src/user/user.service';
import { PatientNotification } from './entities/patient-notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: mongoose.Model<Notification>,
    @InjectModel(PatientNotification.name)
    private patientNotificationModel: mongoose.Model<PatientNotification>,
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const json = configService.get('FIREBASE_CREDENTIAL_JSON');
    console.log('json', json);

    const firebaseCredentials = JSON.parse(
      configService.get('FIREBASE_CREDENTIAL_JSON'),
    );
    if (!firebase.apps.length) {
      firebase.initializeApp({
        credential: firebase.credential.cert(firebaseCredentials),
        databaseURL: 'https://getfit-client.firebaseio.com',
      });
    } else {
      console.log('firebase already initialized');
    }
  }

  async create(
    userId: string,
    dto: CreateNotificationDto,
  ): Promise<NotificationDocument> {
    const createdNotification = new this.notificationModel({
      ...dto,
      userId,
    });
    const savedNotification = await createdNotification.save();
    return savedNotification;
  }

  async createDoctorRequestNotification(
    userId: string,
    dto: CreateDoctorRequestNotificationDto,
  ): Promise<NotificationDocument> {
    const user = await this.userService.findById(userId);
    const createdDoctorNotification = new this.notificationModel({
      title: `New Call request`,
      notificationBody: `${user.name} request a consultation. Please connect at your earliest convenience.`,
      data: `${user.name} request a consultation. Please connect at your earliest convenience.`,
      doctorId: dto.doctorId,
      userId: userId,
      type: 'callRequest',
    });
    console.log(createdDoctorNotification);

    const savedDoctorCallNotification = await createdDoctorNotification.save();
    await this.sendNotification(dto.doctorId, createdDoctorNotification);
    return savedDoctorCallNotification;
  }

  async findAll(id: string, role: string): Promise<Notification[]> {
    if (role === 'doctor') {
      return await this.notificationModel
        .find({
          doctorId: id,
        })
        .sort({ createdAt: 'desc' });
    } else {
      return await this.notificationModel
        .find({
          userId: id,
        })
        .sort({ createdAt: 'desc' });
    }
  }
  async findPatientNotification(
    id: string,
    role: string,
  ): Promise<PatientNotification[]> {
    if (role === 'patient') {
      return await this.patientNotificationModel
        .find({
          userId: id,
        })
        .sort({ createdAt: 'desc' });
    } else {
      return await this.patientNotificationModel
        .find({
          doctorId: id,
        })
        .sort({ createdAt: 'desc' });
    }
  }

  async findById(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id);
    if (!notification) {
      throw new NotFoundException('notification not found');
    }
    return notification;
  }
  async updateById(
    id: string,
    updateDto: UpdateNotificationDto,
  ): Promise<Notification> {
    return await this.notificationModel.findByIdAndUpdate(id, updateDto, {
      new: true,
      runValidators: true,
    });
  }

  
  async deleteMultipleByIds(ids: string[]): Promise<Notification[]> {
    const deletedNotifications: Notification[] = [];

    for (const id of ids) {
      const deletedNotification = await this.notificationModel.findByIdAndDelete(id);
      if (deletedNotification) {
        deletedNotifications.push(deletedNotification);
      }
    }

    return deletedNotifications;
  }

  async deleteMultipleClintNotificationByIds(ids: string[]): Promise<PatientNotification[]> {
    const deletedPatientNotifications: PatientNotification[] = [];

    for (const id of ids) {
      const deletedPatientNotification = await this.patientNotificationModel.findByIdAndDelete(id);
      if (deletedPatientNotification) {
        deletedPatientNotifications.push(deletedPatientNotification);
      }
    }

    return deletedPatientNotifications;
  }



  // calling to patient get the dto and pass the call funtion

  async sendCallToClientData(callingNotificationDto: CallingNotificationDto) {
    await this.sendCallToClient(
      callingNotificationDto.userId,
      callingNotificationDto,
    );
  }

  //send notification
  // I have made tow separate funtions to send notification  to doctor and client and the other notification funtion only for calling

  async sendCallToClient(userId: string, getCallData) {
    console.log(userId, getCallData);
    const dataToSend = {
      notification: {
        title: 'Incoming Voice Call',
        body: 'You Have Consultation Call from Getfit.',
      },
      data: {
        // click_action: 'FLUTTER_NOTIFICATION_CLICK',
        // sound: 'default',
        // status: 'done',
        channel_name: getCallData.channel_name,
        // agora_token: getCallData.agora_token,
        doc_name: getCallData.doc_name,
        doc_image: getCallData.doc_image,
        type: getCallData.type,
      },
    };

    console.log('Data to send:', dataToSend.data);

    return firebase.messaging().sendToTopic(userId, dataToSend);
  }

  async sendNotification(userId: string, getNotificationData) {
    console.log(userId, getNotificationData);
    const dataToSend = {
      notification: {
        title: getNotificationData.title,
        body: getNotificationData.notificationBody,
      },
      // data: {
      //   click_action: 'FLUTTER_NOTIFICATION_CLICK',
      //   sound: 'default',
      //   status: 'done',
      //   type: getNotificationData.type,
      // },
    };

    // console.log('Data to send:', dataToSend.data);

    return firebase.messaging().sendToTopic(userId, dataToSend);
  }
}
