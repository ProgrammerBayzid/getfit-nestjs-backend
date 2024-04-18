import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class Faq {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the faq',
  })
  _id: string;

  @ApiProperty({
    example: 'আপনি সাধারণত কিভাবে পরামর্শ করবেন?',
    description: 'The description of the faq',
  })
  @Prop()
  question: string;

  @ApiProperty({
    example:
      'আন্তর্জাতিক ক্লায়েন্টদের জন্য কল/হোয়াটসঅ্যাপ কলে যেকোনো নতুন/আপডেট করা ডায়েট আপনাকে জানানো হবে। ডায়েট, রেসিপি এবং সম্পূরকগুলি আপনাকে ইমেলের মাধ্যমে জানানো হবে। আপনার যদি অন্য কোনো প্রশ্ন থাকে, আপনি ব্যবসায়িক সময়ের মধ্যে একটি google hangouts এ জিজ্ঞাসা করতে পারেন৷',
    description: 'The answer of the faq',
  })
  @Prop()
  answer: string;

  @ApiProperty({
    example: 'শীর্ষ প্রশ্ন',
    description: 'The category of the faq',
  })
  @Prop()
  category: string;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the faq was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the faq was last updated',
  })
  updatedAt: Date;
}
export const FaqSchema = SchemaFactory.createForClass(Faq);
