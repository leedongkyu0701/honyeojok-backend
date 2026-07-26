import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        { provide: PostService, useValue: {} },
        { provide: JwtAccessGuard, useValue: { canActivate: jest.fn() } },
        { provide: JwtOptionalGuard, useValue: { canActivate: jest.fn() } },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
