import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { User } from "@/user/entities/user.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { Song } from './song.entity';
import { Category } from './category.entity';

@Entity({name: 'song_category'})
export class SongCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'song_category_id' })
  song_category_id: string;

  @ManyToOne(() => Song, (song) => song.song_category, { nullable: false })
  song: Song;

  @ManyToOne(() => Category, (category) => category.song_category, { nullable: false })
  category: Category;
}
