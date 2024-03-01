import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { KafkaLogger } from './kafka-logger';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private logger = new Logger('KafkaProducer');
  private readonly kafka: Kafka;

  private readonly producer: Producer;

  constructor(config: ConfigService) {
    this.kafka = new Kafka({
      brokers: [config.get<string>('kafka.broker')],
      logCreator: KafkaLogger,
    });

    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to Kafka');
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    this.logger.log('Disconnecting to Kafka');
    await this.producer.disconnect();
  }

  async produce(record: ProducerRecord) {
    return this.producer.send(record);
  }
}
