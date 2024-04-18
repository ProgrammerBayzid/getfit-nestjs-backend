import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
} from 'agora-token';


// import agoraToken from 'agora-token'

@Injectable()
export class AgoraService {

  constructor(private configService: ConfigService) { }


  generateRtcToken(uid: number, channelName: string): any {

    // console.log(role);
    
    const appID = '1f1c6466fc08405e9c6528d4b9a6a092';
    const appCertificate = '0f12c30b55074838b727b4267fef5071';
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600 * 3 * 24;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUserAccount(appID, appCertificate, channelName, uid, role, privilegeExpiredTs,privilegeExpiredTs);

    return {
      token,
    }
  }

  // generateRtmToken(account: string): string {
  //   const appID = '1f1c6466fc08405e9c6528d4b9a6a092';
  //   const appCertificate = '0f12c30b55074838b727b4267fef5071';
  //   const role = RtmRole.Rtm_User;
  //   const expirationTimeInSeconds = 3600;
  //   const currentTimestamp = Math.floor(Date.now() / 1000);
  //   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  //   // RTM token
  //   const token = RtmTokenBuilder.buildToken(
  //     appID,
  //     appCertificate,
  //     account,
  //     role,
  //     privilegeExpiredTs,
  //   );

  //   return token;
  // }
}
