import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../clients/entities/client.entity';
import { Currency } from '../../currency/entities/currency.entity';

export class Payment {
  id!: number;

  client_id!: Client['id'];

  currency_id!: Currency['id'];

  amount_returned!: number;

  @ApiProperty({ example: new Date().toISOString() })
  created_at!: string;

  constructor(data: Payment) {
    Object.assign(this, data);
  }
}
