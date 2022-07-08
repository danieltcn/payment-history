import { IsOptional, IsString, Length } from 'class-validator';
import { Client } from '../entities/client.entity';

export class ClientGetAllDto {
  @IsString()
  @IsOptional()
  @Length(2, 255)
  lastname?: Client['lastname'];

  @IsString()
  @IsOptional()
  @Length(2, 255)
  firstname?: Client['firstname'];

  @IsString()
  @IsOptional()
  @Length(5, 255)
  email?: Client['email'];
}
