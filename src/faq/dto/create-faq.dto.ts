import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({
    example: 'আপনি সাধারণত কিভাবে পরামর্শ করবেন?',
    description: 'The description of the faq',
  })
  @IsString()
  @IsNotEmpty()
  readonly question: string;

  @ApiProperty({
    example:
      'আন্তর্জাতিক ক্লায়েন্টদের জন্য কল/হোয়াটসঅ্যাপ কলে যেকোনো নতুন/আপডেট করা ডায়েট আপনাকে জানানো হবে। ডায়েট, রেসিপি এবং সম্পূরকগুলি আপনাকে ইমেলের মাধ্যমে জানানো হবে। আপনার যদি অন্য কোনো প্রশ্ন থাকে, আপনি ব্যবসায়িক সময়ের মধ্যে একটি google hangouts এ জিজ্ঞাসা করতে পারেন৷',
    description: 'The answer of the faq',
  })
  @IsString()
  @IsNotEmpty()
  readonly answer: string;

  @ApiProperty({
    example: 'শীর্ষ প্রশ্ন',
    description: 'The category of the faq',
  })
  @IsString()
  @IsNotEmpty()
  readonly category: string;
}
