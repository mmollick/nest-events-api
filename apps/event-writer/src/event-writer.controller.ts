import { Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventDto, UsageEventService } from '@app/usage-events';

@Controller()
export class EventWriterController {
  private logger = new Logger('EventWriterController');

  constructor(private readonly usage: UsageEventService) {}

  @EventPattern('user-events')
  @UsePipes(new ValidationPipe({ transform: true }))
  async writeEvent(@Payload() event: EventDto) {
    this.logger.debug('Committing event to database', {
      projectId: event.projectId,
    });
    await this.usage.create(event);
  }
}
