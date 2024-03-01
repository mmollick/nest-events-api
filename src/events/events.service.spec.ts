import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { DB_CLIENT } from '../database/database.constant';
import { eq } from 'drizzle-orm';
import { events } from '../database/schema';

const insertApi = {
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockResolvedValue({}),
};

const client = {
  insert: jest.fn().mockReturnValue(insertApi),
  query: {
    events: {
      findMany: jest.fn(),
    },
  },
};

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: DB_CLIENT,
          useValue: client,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('calls the database clients insert command', async () => {
      await service.create({
        event: 'page_view',
      });

      expect(client.insert).toHaveBeenCalled();
      expect(insertApi.values).toHaveBeenCalledWith({
        event: 'page_view',
      });
    });
  });

  describe('findByProjectPaginated', () => {
    it('should call findMany database command', async () => {
      await service.findByProjectPaginated('123', {
        limit: 5,
        page: 5,
      });

      expect(client.query.events.findMany).toHaveBeenCalledWith({
        where: eq(events.projectId, '123'),
        limit: 5,
        offset: 4,
      });
    });
  });
});
