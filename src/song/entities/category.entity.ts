import { Entity, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Column } from "typeorm/decorator/columns/Column";
import { SongCategory } from "./song-category.entity";

@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
    category_id: string;
    
    @Column({ name: 'category_name', type: 'varchar', length: 255 })
    category_name: string;

    @OneToMany(() => SongCategory, (song_category) => song_category.category, { nullable: true })
    song_category: SongCategory[];
    
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}