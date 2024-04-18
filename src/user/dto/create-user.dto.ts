import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '01676485383',
    description: 'The mobile of the user',
  })
  @IsString()
  @IsNotEmpty()
  mobile: string;


  @ApiProperty({
    example: 'PT2056',
    description: 'The Patient unique ID',
  })
  @IsString()
  @IsNotEmpty()
  uniqueId: string;

}
