import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;


  @ApiProperty()
  expires_in: Date; 


  @ApiProperty()
  userId: string; 


}
