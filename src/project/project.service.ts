import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_CONNECTION } from '../database/database.constant';
import { projects } from '../database/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(@Inject(DB_CONNECTION) private db: NodePgDatabase) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.db
      .insert(projects)
      .values({
        id: uuidv4(),
        ...createProjectDto,
      })
      .returning();
  }

  async findAll() {
    return this.db.select().from(projects);
  }

  async findOne(id: string) {
    const result = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);

    return result[0] ?? null;
  }
}
