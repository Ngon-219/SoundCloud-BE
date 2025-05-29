import { User } from "@/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'transaction'})
export class TransactionTable {
    @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
    transaction_id: string;

    @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ name: 'currency', type: 'varchar', length: 10, default: 'USD' })
    currency: string;

    @Column({ name: 'status', type: 'varchar', length: 20, default: 'pending' })
    status: string;

    @Column({ name: 'order_id', type: 'varchar', length: 20, default: '' })
    orderId: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.transactions, { nullable: false })
    user: User;
}