import { Column, Entity, Like, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from '../../song/entities/song.entity';
import { Playlist } from '../../playlist/entities/playlist.entity';
import { LikeSong } from '../../like-song/entities/like-song.entity';
import { ListeningHistory } from './listening-history.entity';
import { Report } from '@/report/entities/report.entity';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned',
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    user_id: string;

    @Column({ name: 'user_name', type: 'varchar', length: 100 })
    username: string;

    @Column({ name: 'user_email', type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ name: 'user_avatar', type: 'varchar', length: 255 })
    avatar: string;

    // @Column({ name: 'user_birthday', type: 'date', nullable: true })
    // birthday: Date;

    @Column({ name: 'user_role', type: 'enum', enum: UserRole, enumName: 'user_role_enum', default: UserRole.USER })
    role: UserRole;

    @Column({ name: 'user_status', type: 'enum', enum: UserStatus, enumName: 'user_status_enum', default: UserStatus.ACTIVE })
    status: UserStatus;

    @Column({ name: 'user_following_count', type: 'int', default: 0 })
    follower_count: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => Song, (song) => song.user, { nullable: true })
    songs: Song[]; 

    @OneToMany(() => Playlist, (playlist) => playlist.user, { nullable: true })
    playlists: Playlist[];

    @OneToMany(() => LikeSong, (like_song) => like_song.user, { nullable: true })
    like_song: LikeSong[];

    @OneToMany(() => ListeningHistory, (listening_history) => listening_history.user, { nullable: true })
    listening_history: ListeningHistory[];

    @OneToMany(() => Report, (report) => report.user, {nullable: false})
    report: Report
}

