import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventDto, UsageEventService } from '@app/usage-events';

@Controller()
export class EventWriterController {
  constructor(private readonly usage: UsageEventService) {}

  @EventPattern('user-events')
  async writeEvent(@Payload() event: EventDto) {
    const result = await this.usage.create(event);

    console.log({ result });
    return result;
  }
}
