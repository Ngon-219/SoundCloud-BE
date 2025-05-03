import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "@/user/entities/user.entity";
import { SongPlaylist } from "@/playlist/entities/song-playlist.entity";
import { Song } from "@/song/entities/song.entity";

@Entity({ name: 'playlist' })
export class Playlist {
    @PrimaryGeneratedColumn('uuid', { name: 'playlist_id' })
    playlist_id: string;

    @Column({ name: 'playlist_name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'playlist_image', type: 'text', nullable: true })
    playlist_image: string;

    @Column({ name: 'is_public', type: 'text', nullable: true })
    is_public: boolean;
    
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.playlists, { nullable: false })
    user: User;

    @OneToMany(() => SongPlaylist, (song_playlist) => song_playlist.playlist, { nullable: true })
    songPlaylist: SongPlaylist[];

}
