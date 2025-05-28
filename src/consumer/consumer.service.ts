import { MailService } from '@/mail/mail.service';
import { Controller, Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ConsumerService {
    constructor(
        private readonly mailService: MailService
    ) {}

    @EventPattern('send_email')
    async handleSendEmail(@Payload() data: any) {
        await this.mailService.sendMail(data.message)
    }
}
