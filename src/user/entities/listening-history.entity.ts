import { Entity, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Column } from "typeorm/decorator/columns/Column";
import { User } from "@/user/entities/user.entity";
import { Song } from "@/song/entities/song.entity";

@Entity({ name: 'listening_history' })
export class ListeningHistory {
    @PrimaryGeneratedColumn('uuid', { name: 'listening_history_id' })
    listening_history_id: string;

    @ManyToOne(() => Song, (song) => song.listening_history, { nullable: false })
    song: Song;

    @ManyToOne(() => User, (user) => user.listening_history, { nullable: false })
    user: User;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}