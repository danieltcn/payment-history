import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(128)
  firstname!: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(128)
  lastname!: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(255)
  email!: string;
}
