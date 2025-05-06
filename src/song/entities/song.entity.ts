import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { User } from "@/user/entities/user.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { SongCategory } from "./song-category.entity";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { SongPlaylist } from "@/playlist/entities/song-playlist.entity";
import { LikeSong } from "@/like-song/entities/like-song.entity";

export enum SongStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    DELETED = 'deleted',
}

@Entity({ name: 'songs' })
export class Song {
  @PrimaryGeneratedColumn('uuid', { name: 'song_id' })
    song_id: string;

    @ManyToOne(() => User, (user) => user.songs, { nullable: false })
    user: User;

    @Column({ name: 'song_name', type: 'varchar', length: 255 })
    link_song: string;

    @Column({ name: 'song_image', type: 'varchar', length: 255 })
    song_image: string;

    @Column({
        name: 'status',
        type: 'enum',
        enum: SongStatus,
        default: SongStatus.PENDING
    })
    status: SongStatus;

    @Column({ name: 'duration', type: 'int', nullable: true })
    duration: number;

    @Column({ name: 'view', type: 'int', nullable: true })
    view: number;

    @Column({ name: 'name', type: 'text', nullable: true })
    name: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => SongCategory, (song_category) => song_category.song, { nullable: true })
    song_category: SongCategory[];

    @OneToMany(() => SongPlaylist, (song_playlist) => song_playlist.song, { nullable: true })
    song_playlist: SongPlaylist[];

    @OneToMany(() => LikeSong, (like_song) => like_song.song, { nullable: true })
    like_song: LikeSong[];
}
