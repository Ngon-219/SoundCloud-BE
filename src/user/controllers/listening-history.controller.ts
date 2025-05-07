import { Controller, UseGuards } from "@nestjs/common";
import { ListeningHistoryService } from "../services/listening-history.service";
import { JwtGuard } from "@/auth/guards/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Get, Req } from "@nestjs/common/decorators";

@Controller('listening-history')
export class ListeningHistoryController {
    constructor(
        private readonly listeningHistoryService: ListeningHistoryService,
    ) {}

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth('jwt')
    async getListeningHistoryByUserId(@Req() req: any) {
        return this.listeningHistoryService.getListeningHistoryByUserId(req.user.user_id);
    }
}