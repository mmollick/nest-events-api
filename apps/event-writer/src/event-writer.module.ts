import { Module } from '@nestjs/common';
import { EventWriterController } from './event-writer.controller';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@app/config';
import { UsageEventService } from '@app/usage-events';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [EventWriterController],
  providers: [UsageEventService],
})
export class EventWriterModule {}
