
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CallingNotificationDto {
  @ApiProperty({
    example: 'test1234',
    description: 'The Calling channel Name',
  })
  @IsOptional()
  @IsString()
  channel_name?: string;

  @ApiProperty({
    example: '',
    description: 'The doctor id',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    example: 'Hello',
    description: 'The calling notification doc name',
  })
  @IsOptional()
  @IsString()
  doc_name?: string;

  @ApiProperty({
    example:
      '007eJxTYFh/VCi7ODnfKtfRa0O12qejbiFbDZZrHXCfsXFlzcoYDSsFBsM0w2QzEzOztGQDCxMD01TLZDNTI4sUkyTLRLNEA0ujI3fepX5he5/6bSI7EyMDBIL4HAwlqcUlhkbGJhIMZqapxmbJphYmicbmlpbGZklmFhYmiQZJAGFOKSM',
    description: 'The calling notification agora token,',
  })
  @IsOptional()
  @IsString()
  agora_token?: string;

  @ApiProperty({
    example: 'image.png',
    description: 'The calling notification doc image',
  })
  @IsOptional()
  @IsString()
  doc_image?: string;

  @ApiProperty({
    example: 'Hello',
    description: 'The calling notification type',
  })
  @IsOptional()
  @IsString()
  type?: string;
}
