import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { ProjectService } from '../project/project.service';
import {
  UsageEventProducerService,
  UsageEventService,
} from '@app/usage-events';

@Module({
  controllers: [EventsController],
  providers: [ProjectService, UsageEventService, UsageEventProducerService],
})
export class EventsModule {}
