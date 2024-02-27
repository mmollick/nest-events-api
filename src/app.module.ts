import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ProjectModule } from './project/project.module';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [EventsModule, ConfigModule, DatabaseModule, ProjectModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
