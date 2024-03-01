import { Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from '../database/database.constant';
import { events, NewEvent } from '../database/schema';
import { eq } from 'drizzle-orm';
import { DatabaseClient } from '../database/database-connection.service';
import { HttpParamsDto } from '../libs/http-params.dto';
import { ProducerService } from '../kafka/producer.service';

@Injectable()
export class EventsService {
  constructor(
    @Inject(DB_CLIENT) private db: DatabaseClient,
    @Inject(ProducerService) private producer: ProducerService,
  ) {}

  async create(newEvent: NewEvent) {
    return this.producer.produce({
      topic: 'events',
      messages: [
        {
          value: JSON.stringify(newEvent),
        },
      ],
    });
  }

  async findByProjectPaginated(id: string, filter: HttpParamsDto) {
    return this.db.query.events.findMany({
      where: eq(events.projectId, id),
      limit: filter.limit,
      offset: Math.max(filter.page - 1, 0),
    });
  }
}
