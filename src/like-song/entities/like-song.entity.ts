import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "@/user/entities/user.entity";
import { Song } from "@/song/entities/song.entity";

@Entity({ name: 'like_song' })
export class LikeSong {
    @PrimaryGeneratedColumn('uuid', { name: 'like_song_id' })
    like_song_id: string;

    @ManyToOne(() => Song, (song) => song.like_song, { nullable: false })
    song: Song;

    @ManyToOne(() => User, (user) => user.like_song, { nullable: false })
    user: User;

    @Column({ name: 'status', type: 'boolean', default: true })
    status: boolean;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
