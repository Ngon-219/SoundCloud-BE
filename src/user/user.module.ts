import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from '@/repositories/userRepository';
import { ListeningHistory } from './entities/listening-history.entity';
import { ListeningHistoryRepo } from '@/repositories/listening-history.repository';
import { ListeningHistoryService } from './services/listening-history.service';
import { ListeningHistoryController } from './controllers/listening-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    ListeningHistory
  ])],
  controllers: [UserController, ListeningHistoryController],
  providers: [UserService, UserRepository, ListeningHistoryRepo, ListeningHistoryService],
  exports: [UserService, UserRepository, ListeningHistoryRepo, ListeningHistoryService],
})
export class UserModule {}
