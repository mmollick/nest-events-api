import { IsDate, IsObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseEventDto {
  @IsString()
  userId: string;

  @IsString()
  event: string;

  @IsObject()
  properties: Record<string, any>;

  @IsDate()
  @Type(() => Date)
  timestamp: Date;
}

export class HttpEventDto extends BaseEventDto {}

export class EventDto extends BaseEventDto {
  @IsString()
  projectId: string;
}
