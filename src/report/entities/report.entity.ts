import { Song } from "@/song/entities/song.entity";
import { User } from "@/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "report"})
export class Report {
    @PrimaryGeneratedColumn('uuid', {name: 'report_id'})
    report_id: string;

    @ManyToOne(() => Song, (song) => song.report, {nullable: false})
    song: Song

    @ManyToOne(() => User, (user) => user.report, {nullable: false})
    user: User;

    @Column({name: "content", type: 'text', nullable: false})
    content: string;

     @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
