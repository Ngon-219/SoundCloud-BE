import { User } from "@/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: 'search_history'})
export class SearchHistory {
    @PrimaryGeneratedColumn('uuid', {name: 'search_history_id'})
    search_history_id: string;

    @ManyToOne(() => User, (user) => user.search_history, {nullable: true})
    @JoinColumn({ name: 'user_id' }) 
    user: User;

    @Column({name: 'keyword', type: 'varchar', length: 100})
    keyword: string;

    @Column({name: 'status', type: 'boolean'})
    status: boolean;
}

