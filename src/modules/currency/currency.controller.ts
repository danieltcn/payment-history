import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyGetAllDto } from './dto/get-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(@Body(ValidationPipe) createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  async findAll(@Query() query: CurrencyGetAllDto): Promise<Currency[]> {
    return this.currencyService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: Currency['id']) {
    return this.currencyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: Currency['id'],
    @Body(ValidationPipe) updateCurrencyDto: UpdateCurrencyDto,
  ) {
    return this.currencyService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: Currency['id']) {
    return this.currencyService.remove(id);
  }
}
