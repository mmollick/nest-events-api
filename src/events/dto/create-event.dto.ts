import { IsDate, IsDateString, IsObject, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateEventDto {
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
