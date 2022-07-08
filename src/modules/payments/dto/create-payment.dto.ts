import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsInt } from 'class-validator';
import { Client } from '../../clients/entities/client.entity';
import { Currency } from '../../currency/entities/currency.entity';

export class CreatePaymentDto {
  @ApiProperty()
  @IsInt()
  amount_returned!: number;

  @ApiProperty()
  @IsInt()
  client_id!: Client['id'];

  @ApiProperty()
  @IsInt()
  currency_id!: Currency['id'];
}
