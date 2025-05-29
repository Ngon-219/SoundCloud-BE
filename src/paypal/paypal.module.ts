import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTable } from './entities/transaction.entity';
import { TransactionRepo } from '@/repositories/transaction.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionTable])
  ],
  providers: [PaypalService, TransactionRepo],
  controllers: [PaypalController],
  exports: [PaypalService, TransactionRepo]
})
export class PaypalModule {}
