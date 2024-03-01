import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  UseInterceptors,
  Inject,
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
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheStore,
} from '@nestjs/cache-manager';
import { Request } from 'express';

@Controller('events/:projectId')
@UseInterceptors(CacheInterceptor)
@UseGuards(PublicProjectGuard)
export class EventsController {
  constructor(
    private readonly producer: UsageEventProducerService,
    private readonly usage: UsageEventService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {}

  @Post()
  @SkipAuth()
  async create(
    @Req() request: Request,
    @Body() createEventDto: HttpEventDto,
    @Param('projectId') projectId: string,
  ) {
    this.cacheManager.del(request.originalUrl);
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
