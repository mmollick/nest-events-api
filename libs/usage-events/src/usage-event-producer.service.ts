import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventDto } from '@app/usage-events/usage-event.dto';

@Injectable()
export class UsageEventProducerService {
  private logger = new Logger('UsageEventProducer');

  constructor(@Inject('KAFKA_SERVICE') private client: ClientKafka) {}

  async publish(newEvent: EventDto) {
    this.logger.debug('Received event', { projectId: newEvent.projectId });
    return this.client.emit('user-events', newEvent);
  }
}
