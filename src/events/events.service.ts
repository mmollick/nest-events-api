import { Inject, Injectable } from '@nestjs/common';
import { DB_CONNECTION } from '../database/database.constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { events, NewEvent } from 'src/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsService {
  constructor(@Inject(DB_CONNECTION) private db: NodePgDatabase) {}

  async create(newEvent: NewEvent) {
    return this.db.insert(events).values(newEvent).returning();
  }

  async findByProject(id: string) {
    return this.db.select().from(events).where(eq(events.projectId, id));
  }
}
