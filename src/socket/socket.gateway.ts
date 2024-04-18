import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Model } from 'mongoose';

@ApiTags('WebSocket')
@WebSocketGateway()
export class WebsocketGateway {
  constructor(
    @InjectModel('Doctor') private readonly doctorModel: Model<Doctor>,
  ) {}

  @WebSocketServer() server: Server;

  @ApiResponse({ status: 200, description: 'Successfully set online status' })
  @SubscribeMessage('doctor-online')
  async handleOnlineStatus(@MessageBody() doctorId: number): Promise<void> {
    console.log(`Doctor with ID ${doctorId} is now online`);
    await this.doctorModel.findByIdAndUpdate(doctorId, {
      online: true,
    });
    this.server.emit('doctor-online', doctorId);
  }

  @ApiResponse({ status: 200, description: 'Successfully set offline status' })
  @SubscribeMessage('doctor-offline')
  async handleOfflineStatus(@MessageBody() doctorId: number): Promise<void> {
    console.log(`Doctor with ID ${doctorId} is now offline`);
    await this.doctorModel.findByIdAndUpdate(doctorId, {
      online: false,
    });
    this.server.emit('doctor-offline', doctorId);
  }
}
