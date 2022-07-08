import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class Client {
  @Exclude()
  @ApiHideProperty()
  id!: number;

  firstname!: string;

  lastname!: string;

  email!: string;

  @ApiProperty({ example: new Date().toISOString() })
  created_at!: string;

  @ApiProperty({ example: new Date().toISOString() })
  updated_at!: string;

  constructor(data: Client) {
    Object.assign(this, data);
  }
}
