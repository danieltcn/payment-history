import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  iso_code: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  symbol: string;
}
