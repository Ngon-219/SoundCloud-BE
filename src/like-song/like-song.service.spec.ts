import { Test, TestingModule } from '@nestjs/testing';
import { LikeSongService } from './like-song.service';

describe('LikeSongService', () => {
  let service: LikeSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeSongService],
    }).compile();

    service = module.get<LikeSongService>(LikeSongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
