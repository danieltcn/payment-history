import { Payment } from './entities/payment.entity';

export type PaymentGetAll = {
  clientId?: Payment['client_id'];
  currencyId?: Payment['currency_id'];
  start_date?: string;
  end_date?: string;
};

export type PaymentCreate = Omit<Payment, 'id' | 'created_at'>;
