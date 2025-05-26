import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private readonly mailService: MailerService,
        private readonly configService: ConfigService
    ) {}

    async sendMail(message: String) {
        try {
            await this.mailService.sendMail({
                to: this.configService.get('RECEIVER_USER'),
                from: '"SoundCloud System" <no-reply@soundcloud.com>',
                subject: '🎵 New Notification from SoundCloud',
                text: `You have a new notification: ${message}`,
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
                        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px;">
                            <h2 style="color: #ff5500;">🔔 New Notification</h2>
                            <p>Hello,</p>
                            <p>You have received a new notification from <strong>SoundCloud</strong>:</p>
                            <div style="background-color: #f1f1f1; padding: 15px; border-left: 4px solid #ff5500; margin: 20px 0; font-style: italic;">
                                ${message}
                            </div>
                            <p>Thank you for using SoundCloud! 🎧</p>
                            <p style="font-size: 13px; color: #888;">This is an automated message. Please do not reply.</p>
                        </div>
                    </div>
                `
            });
            return {
                success: true
            }
        } catch (err) {
            console.error("Have err when try to send mail noti: ", err);
            return {
                success: false
            }
        }
    }
}
