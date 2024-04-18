import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgoraService } from './agora.service';
import { CreateAgoraDto } from './dto/create-agora.dto';
import { UpdateAgoraDto } from './dto/update-agora.dto';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RtcRole } from 'agora-token';


@Controller('agora')
export class AgoraController {
  constructor(private readonly agoraService: AgoraService) {}



  @ApiBearerAuth()
  @Get('rtc/:channelName')
  generateRtcToken(
    @GetCurrentUser('userId') uid: number,
    @GetCurrentUser('role') role: string,
    @Param('channelName') channelName: string,
  ): string {
    return this.agoraService.generateRtcToken(uid, channelName);
  }

  // @Get('rtm/:account')
  // generateRtmToken(@Param('account') account: string): string {
  //   return this.agoraService.generateRtmToken(account);
  // }


  // @Get('token')
  // generateAppToken(): string {
  //   return this.agoraService.generateAppToken();
  // }
}
