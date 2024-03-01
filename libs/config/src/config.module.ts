import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import config from './config';
import { validate } from './env.validate';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validate,
    }),
  ],
})
export class ConfigModule {}
