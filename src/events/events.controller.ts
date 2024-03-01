import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PublicProjectGuard } from '../guards/public-project.guard';
import { SkipAuth } from '../decorators/skip-auth';
import { HttpParamsDto } from '../libs/http-params.dto';

@Controller('events/:projectId')
@UseGuards(PublicProjectGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @SkipAuth()
  async create(
    @Body() createEventDto: CreateEventDto,
    @Param('projectId') projectId: string,
  ) {
    await this.eventsService.create({ projectId, ...createEventDto });
    return { acknowledged: true };
  }

  @Get()
  async findAll(
    @Param('projectId') projectId: string,
    @Query() filter: HttpParamsDto,
  ) {
    return this.eventsService.findByProjectPaginated(projectId, filter);
  }
}
