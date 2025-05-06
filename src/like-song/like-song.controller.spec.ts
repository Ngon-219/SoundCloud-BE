import { Test, TestingModule } from '@nestjs/testing';
import { LikeSongController } from './like-song.controller';
import { LikeSongService } from './like-song.service';

describe('LikeSongController', () => {
  let controller: LikeSongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeSongController],
      providers: [LikeSongService],
    }).compile();

    controller = module.get<LikeSongController>(LikeSongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
