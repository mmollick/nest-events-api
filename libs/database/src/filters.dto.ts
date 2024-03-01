import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @Transform(({ value }) => toNumber(value, 1, 1))
  @IsNumber()
  @IsOptional()
  public page: number = 1;

  @Transform(({ value }) => toNumber(value, 1, 10))
  @IsNumber()
  @IsOptional()
  public limit: number = 10;
}

const toNumber = (value: number | null, min: number, fallback: number) => {
  if (value) {
    return Math.max(Number(value), min);
  }
  return fallback;
};
