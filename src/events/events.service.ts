import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { DB_CONNECTION } from '../database/database.constant';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { events } from 'src/database/schema';

@Injectable()
export class EventsService {
  constructor(@Inject(DB_CONNECTION) private db: NodePgDatabase) {}

  async create(createEventDto: CreateEventDto) {
    await this.db.insert(events).values(createEventDto);
  }

  async findAll() {
    return this.db.select().from(events);
  }
}
