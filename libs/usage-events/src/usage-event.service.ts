import { Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from '@app/database/database.constant';
import { DatabaseClient } from '@app/database/database-connection.service';
import { desc, eq } from 'drizzle-orm';
import { events, NewEvent } from '@app/database/schema';
import { PaginationDto } from '@app/database/filters.dto';

@Injectable()
export class UsageEventService {
  constructor(@Inject(DB_CLIENT) private db: DatabaseClient) {}

  async create(newEvent: NewEvent) {
    return this.db.insert(events).values(newEvent).returning();
  }

  async findByProjectPaginated(id: string, filter: PaginationDto) {
    return this.db.query.events.findMany({
      where: eq(events.projectId, id),
      limit: filter.limit,
      offset: Math.max(filter.page - 1, 0),
      orderBy: desc(events.created_at),
    });
  }
}
