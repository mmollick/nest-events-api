import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PublicProjectGuard } from '../guards/public-project.guard';
import { SkipAuth } from '../decorators/skip-auth';

@Controller('events/:projectId')
@UseGuards(PublicProjectGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @SkipAuth()
  create(
    @Body() createEventDto: CreateEventDto,
    @Param('projectId') projectId: string,
  ) {
    return this.eventsService.create({ projectId, ...createEventDto });
  }

  @Get()
  async findAll(@Param('projectId') projectId: string) {
    console.log(projectId);
    return this.eventsService.findByProject(projectId);
  }
}
