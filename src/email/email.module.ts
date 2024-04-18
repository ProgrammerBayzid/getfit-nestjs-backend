import { Module } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService, MailService],
  exports: [EmailService],
})
export class EmailModule {}
