import { IsDateString, IsInt, IsOptional } from 'class-validator';
import { Client } from '../../clients/entities/client.entity';
import { Currency } from '../../currency/entities/currency.entity';

export class GetsPaymentDto {
  @IsInt()
  @IsOptional()
  amount_returned?: number;

  @IsInt()
  @IsOptional()
  client_id?: Client['id'];

  @IsInt()
  @IsOptional()
  currency_id?: Currency['id'];

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;
}
