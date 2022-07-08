import { IsOptional, IsString, Length } from 'class-validator';
import { Currency } from '../entities/currency.entity';

export class CurrencyGetAllDto {
  @IsString()
  @IsOptional()
  @Length(2, 255)
  name?: Currency['name'];

  @IsString()
  @IsOptional()
  @Length(2, 255)
  iso_code?: Currency['iso_code'];

  @IsString()
  @IsOptional()
  @Length(2, 255)
  symbol?: Currency['symbol'];
}
