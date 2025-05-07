import { ListeningHistoryRepo } from "@/repositories/listening-history.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListeningHistoryService {
    constructor(
        private readonly listeningHistoryRepository: ListeningHistoryRepo,
    ) {}

    async getListeningHistoryByUserId(userId: string) {
        return this.listeningHistoryRepository.getListeningHistoryByUserId(userId);
    }
}