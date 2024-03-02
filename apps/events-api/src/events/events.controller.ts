import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import {
  UsageEventService,
  UsageEventProducerService,
} from '@app/usage-events';
import { PublicProjectGuard } from '../guards/public-project.guard';
import { SkipAuth } from '../decorators/skip-auth';
import { HttpEventDto } from '@app/usage-events';
import { PaginationDto } from '@app/database/filters.dto';
import { Request } from 'express';

@Controller('events/:projectId')
@UseGuards(PublicProjectGuard)
export class EventsController {
  constructor(
    private readonly producer: UsageEventProducerService,
    private readonly usage: UsageEventService,
  ) {}

  @Post()
  @SkipAuth()
  async create(
    @Req() request: Request,
    @Body() createEventDto: HttpEventDto,
    @Param('projectId') projectId: string,
  ) {
    await this.producer.publish({ projectId, ...createEventDto });
    return { acknowledged: true };
  }

  @Get()
  async findAll(
    @Param('projectId') projectId: string,
    @Query() filter: PaginationDto,
  ) {
    return this.usage.findByProjectPaginated(projectId, filter);
  }
}
