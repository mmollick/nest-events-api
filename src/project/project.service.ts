import { Inject, Injectable } from '@nestjs/common';
import { DB_CLIENT } from '../database/database.constant';
import { projects } from '../database/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectDto } from './dto/create-project.dto';
import { DatabaseClient } from '../database/database-connection.service';
import { HttpParamsDto } from '../libs/http-params.dto';

@Injectable()
export class ProjectService {
  constructor(@Inject(DB_CLIENT) private db: DatabaseClient) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.db
      .insert(projects)
      .values({
        id: uuidv4(),
        ...createProjectDto,
      })
      .returning();
  }

  async findAllPaginated(filter: HttpParamsDto) {
    return this.db.query.projects.findMany({
      limit: filter.limit,
      offset: Math.max(filter.page - 1, 0),
    });
  }

  async findOne(id: string) {
    return this.db.query.projects.findFirst({
      where: eq(projects.id, id),
    });
  }
}
