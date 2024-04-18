import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Notification } from './entities/notification.entity';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { CallingNotificationDto } from './dto/calling-notification-dto';
import { CreateDoctorRequestNotificationDto } from './dto/create-call-request-to-doctor.dto';
import { PatientNotification } from './entities/patient-notification.entity';
import { DeleteMultipleNotificationsDto } from './dto/multiple-notification-delete.dto';
@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Save new Notification' })
  @ApiCreatedResponse({ type: Notification })
  async createPlan(
    @Body()
    createNotificationDto: CreateNotificationDto,
    @GetCurrentUser('userId') userId?: string,
  ): Promise<Notification> {
    return this.notificationsService.create(userId, createNotificationDto);
  }

  @Post('/call-notification-send')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'send call Notification' })
  async sendCallNotification(
    @Body()
    callingNotificationDto: CallingNotificationDto,
  ) {
    try {
      await this.notificationsService.sendCallToClientData(
        callingNotificationDto,
      );
      return { success: true, message: 'Call Notification sent successfully' };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Failed to send call notification');
    }
  }

  @Post('call-request-to-doctor')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'post doctor Notification' })
  @ApiCreatedResponse({ type: Notification })
  async createDoctorRequestNotification(
    @Body()
    createDoctorRequestNotification: CreateDoctorRequestNotificationDto,
    @GetCurrentUser('userId') userId?: string,
  ): Promise<Notification> {
    return this.notificationsService.createDoctorRequestNotification(
      userId,
      createDoctorRequestNotification,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all saved notification' })
  @ApiOkResponse({ type: [Notification] })
  @ApiBearerAuth()
  async getAllNotification(
    @GetCurrentUser('userId') userId?: string,
    @GetCurrentUser('role') role?: string,
  ): Promise<Notification[]> {
    return this.notificationsService.findAll(userId, role);
  }

  @Get('/get-patient-notification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all saved patient notification' })
  @ApiOkResponse({ type: [PatientNotification] })
  @ApiBearerAuth()
  async getPatientAllNotification(
    @GetCurrentUser('userId') userId?: string,
    @GetCurrentUser('role') role?: string,
  ): Promise<PatientNotification[]> {
    return this.notificationsService.findPatientNotification(userId, role);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiOperation({ summary: 'Get all saved Notification' })
  @ApiOkResponse({ type: [Notification] })
  @ApiBearerAuth()
  async getGetNotification(
    @Param('id')
    id: string,
  ): Promise<Notification> {
    return this.notificationsService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Notification by id' })
  @ApiOkResponse({ type: Notification })
  async updateNotification(
    @Param('id')
    id: string,
    @Body()
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    return this.notificationsService.updateById(id, updateNotificationDto);
  }

  

  @Delete('multiple-delete-doctor-notification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete multiple saved audio Notifications' })
  @ApiBody({ type: DeleteMultipleNotificationsDto })
  @ApiOkResponse({ type: [Notification] })
  async deleteMultipleNotifications(
    @Body() dto: DeleteMultipleNotificationsDto,
  ): Promise<Notification[]> {
    const { ids } = dto;
    return this.notificationsService.deleteMultipleByIds(ids);
  }

  @Delete('multiple-delete-clint-notification')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete multiple saved audio Notifications' })
  @ApiBody({ type: DeleteMultipleNotificationsDto })
  @ApiOkResponse({ type: [PatientNotification] })
  async deleteMultipleClintNotifications(
    @Body() dto: DeleteMultipleNotificationsDto,
  ): Promise<PatientNotification[]> {
    const { ids } = dto;
    return this.notificationsService.deleteMultipleClintNotificationByIds(ids);
  }
}
