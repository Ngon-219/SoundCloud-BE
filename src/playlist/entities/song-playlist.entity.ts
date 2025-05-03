import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "@/song/entities/song.entity";
import { Playlist } from "@/playlist/entities/playlist.entity";

@Entity({ name: 'song_playlist' })
export class SongPlaylist {
    @PrimaryGeneratedColumn('uuid', { name: 'song_playlist_id' })
    song_playlist_id: string;

    @ManyToOne(() => Song, (song) => song.song_playlist, { nullable: false })
    song: Song;

    @ManyToOne(() => Playlist, (playlist) => playlist.songPlaylist, { nullable: false })
    playlist: Playlist;
}