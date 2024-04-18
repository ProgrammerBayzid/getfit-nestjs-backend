import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { otpCode } from './otp-code-html-temp';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialize the nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'getfitbd.care@gmail.com',
        pass: 'oaio uorz gxxl pjvq',
      },
    });
  }

  // Method to send emails using the transporter
  async sendEmail(to: string, subject: string, code: string): Promise<void> {
    try {
      await this.transporter.verify(); // Ensure transporter is valid
      await this.transporter.sendMail({
        from: 'getfitbd.care@gmail.com',
        to,
        subject,
        html: otpCode(code)
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Rethrow error for further handling
    }
  }
}
