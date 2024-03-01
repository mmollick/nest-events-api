import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ProjectService } from '../project/project.service';
import { ProducerService } from '../kafka/producer.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, ProjectService, ProducerService],
})
export class EventsModule {}
