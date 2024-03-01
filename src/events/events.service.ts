import { Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from '../database/database.constant';
import { events, NewEvent } from '../database/schema';
import { eq } from 'drizzle-orm';
import { DatabaseClient } from '../database/database-connection.service';
import { HttpParamsDto } from '../libs/http-params.dto';

@Injectable()
export class EventsService {
  constructor(@Inject(DB_CLIENT) private db: DatabaseClient) {}

  async create(newEvent: NewEvent) {
    return this.db.insert(events).values(newEvent).returning();
  }

  async findByProjectPaginated(id: string, filter: HttpParamsDto) {
    return this.db.query.events.findMany({
      where: eq(events.projectId, id),
      limit: filter.limit,
      offset: Math.max(filter.page - 1, 0),
    });
  }
}
