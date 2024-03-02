import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { ProjectService } from '../project/project.service';
import {
  UsageEventProducerService,
  UsageEventService,
} from '@app/usage-events';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        useFactory: (config) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: config.get('kafka.brokers'),
            },
            consumer: {
              groupId: config.get('kafka.groupId'),
              allowAutoTopicCreation: true,
            },
          },
        }),
        name: 'KAFKA_SERVICE',
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [ProjectService, UsageEventService, UsageEventProducerService],
})
export class EventsModule {}
