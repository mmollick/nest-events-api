import { Module } from '@nestjs/common';
import { UsageEventService } from './usage-event.service';
import { UsageEventProducerService } from './usage-event-producer.service';

@Module({
  providers: [UsageEventService, UsageEventProducerService],
})
export class UsageEventModule {}
