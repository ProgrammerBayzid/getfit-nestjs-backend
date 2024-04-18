
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateConsultantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly details: string;
  @IsString()
  @IsNotEmpty()
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
