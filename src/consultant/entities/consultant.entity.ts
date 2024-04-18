
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Consultant {
  @Prop()
  name: string;
  @Prop()
  details: string;
  @Prop()
  image: string;
  @Prop()
  price: number;

 
}
export const ConsultantSchema = SchemaFactory.createForClass(Consultant);
