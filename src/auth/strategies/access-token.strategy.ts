import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth, AuthDocument } from '../entities/auth.entity';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('AT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    const userAuth = await this.authModel.findOne({
      userId: payload['userId'],
    });

    if (!userAuth || !userAuth.refreshToken) {
      throw new UnauthorizedException();
    }

    return {
      ...payload,
    };
  }
}
