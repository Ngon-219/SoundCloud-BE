import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "@/song/entities/song.entity";
import { BaseRepository } from "@/repositories/baseRepo";
import { Repository } from "typeorm";
import { ListeningHistory } from "@/user/entities/listening-history.entity";


@Injectable()
export class ListeningHistoryRepo extends BaseRepository<ListeningHistory> {
    constructor(
        @InjectRepository(ListeningHistory)
        private readonly listeningHistoryRepository: Repository<ListeningHistory>,
    ) {
        super(listeningHistoryRepository);
    }

    async getListeningHistoryByUserId(userId: string): Promise<ListeningHistory[]> {
        // return this.listeningHistoryRepository.find({
        //     where: {
        //         user: { user_id: userId },
        //     },
        //     relations: ['song'],
        // });
        return this.listeningHistoryRepository.createQueryBuilder('listening_history')
            .leftJoinAndSelect('listening_history.song', 'song')
            .where('listening_history.user = :userId', { userId: userId })
            .leftJoinAndSelect('song.user', 'user')
            .orderBy('listening_history.created_at', 'DESC')
            .limit(20)
            .getMany();
    }

}
