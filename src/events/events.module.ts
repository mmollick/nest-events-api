import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ProjectService } from '../project/project.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, ProjectService],
})
export class EventsModule {}
