import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./baseRepo";
import { SearchHistory } from "@/search_history/entities/search_history.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/user/entities/user.entity";

@Injectable()
export class SearchHistoryRepository extends BaseRepository<SearchHistory> {
    constructor(
        @InjectRepository(SearchHistory)
        private readonly searchHistoryRepo: Repository<SearchHistory>
    ) {
        super(searchHistoryRepo);
    }

    async getKeyword(user: User) {
        return await this.searchHistoryRepo
            .createQueryBuilder('search_history')
            .where('search_history.user_id = :userId', { userId: user.user_id })
            .getMany();
    }

    async createKeyword(user, keyword) {
        try {
            const newSearchHistory = Object.assign(new SearchHistory(), {
                user: user,
                keyword: keyword,
                status: true,
            });
            await this.searchHistoryRepo.save(newSearchHistory);
        } catch (err) {
            console.error("Have err whne try to insert new Search history: ", err)
        }
    }

}