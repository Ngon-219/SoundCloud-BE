import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./baseRepo";
import { TransactionTable } from "@/paypal/entities/transaction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TransactionRepo extends BaseRepository<TransactionTable> {
    constructor(
        @InjectRepository(TransactionTable)
        private readonly transactionTable: Repository<TransactionTable>
    ) {
        super(transactionTable)
    }
}