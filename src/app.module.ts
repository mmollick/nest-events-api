import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    EventsModule,
    ConfigModule,
    DatabaseModule,
    ProjectModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
