import { NestFactory } from '@nestjs/core';
import { EventWriterModule } from './event-writer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appConfig = await NestFactory.create(EventWriterModule);
  const config = appConfig.get(ConfigService);

  const app = appConfig.connectMicroservice<MicroserviceOptions>({
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
  });

  app.enableShutdownHooks();
  await app.listen();
}
bootstrap();
