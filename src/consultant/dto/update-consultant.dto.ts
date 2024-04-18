import { PartialType } from '@nestjs/swagger';
import { CreateConsultantDto } from './create-consultant.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConsultantDto extends PartialType(CreateConsultantDto) {
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString()
  @IsOptional()
  readonly details: string;
  @IsString()
  @IsOptional()
  readonly image: string;
  @IsNumber()
  @IsOptional()
  readonly price: number;
}
