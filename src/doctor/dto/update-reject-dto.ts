import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean} from 'class-validator';

export class UpdateRejectDto {
  @ApiProperty({
    example: true,
    description: 'The doctor reject true or false',
  })
  @IsBoolean()
  reject: boolean;
}
