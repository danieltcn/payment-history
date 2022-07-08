import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class Currency {
  id!: number;

  name!: string;

  iso_code!: string;

  symbol!: string;

  @ApiProperty({ example: new Date().toISOString() })
  created_at!: string;

  @ApiProperty({ example: new Date().toISOString() })
  updated_at!: string;

  constructor(data: Currency) {
    Object.assign(this, data);
  }
}
