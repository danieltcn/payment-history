import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { GetsPaymentDto } from './dto/get-payments.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body(ValidationPipe) createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  async findAll(@Query() query: GetsPaymentDto): Promise<Payment[]> {
    return this.paymentsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: Payment['id']) {
    return this.paymentsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: Payment['id']) {
    return this.paymentsService.remove(id);
  }
}
