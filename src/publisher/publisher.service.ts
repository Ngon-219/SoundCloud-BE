// publisher/publisher.service.ts
import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PublisherService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'email_queue',
      },
    });
  }

  async sendMailNoti(message) {
    await this.client.emit('send_email', {
      message
    }).toPromise();
  }
}
