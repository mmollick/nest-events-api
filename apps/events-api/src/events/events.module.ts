import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { ProjectService } from '../project/project.service';
import {
  UsageEventProducerService,
  UsageEventService,
} from '@app/usage-events';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,

      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [EventsController],
  providers: [ProjectService, UsageEventService, UsageEventProducerService],
})
export class EventsModule {}
