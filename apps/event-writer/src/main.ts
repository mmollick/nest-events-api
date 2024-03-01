import { NestFactory } from '@nestjs/core';
import { EventWriterModule } from './event-writer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventWriterModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9093'],
        },
        consumer: {
          groupId: 'my-kafka-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  await app.listen();
}
bootstrap();
