import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { EventDto } from '@app/usage-events/usage-event.dto';

@Injectable()
export class UsageEventProducerService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9093'],
      },
      consumer: {
        groupId: 'my-kafka-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  client: ClientKafka;

  async publish(newEvent: EventDto) {
    return this.client.emit('user-events', newEvent);
  }
}
