import { Song } from "@/song/entities/song.entity";
import { User } from "@/user/entities/user.entity";
import { ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { Entity } from "typeorm";

@Entity({name: "comment"})
export class Comment {
    @PrimaryGeneratedColumn('uuid', {name: 'comment_id'})
    comment_id: string;

    @ManyToOne(() => Song, (song) => song.comment, {nullable: false})
    song: Song

    @ManyToOne(() => User, (user) => user.comment, {nullable: false})
    user: User;

    @Column({name: "content", type: 'text', nullable: false})
    content: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
