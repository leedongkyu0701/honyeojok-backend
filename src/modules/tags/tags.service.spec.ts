import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/exceptions/base.exception';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  let service: TagsService;
  const tagRepository = {
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        { provide: getRepositoryToken(Tag), useValue: tagRepository },
      ],
    }).compile();
    service = module.get<TagsService>(TagsService);
  });

  it('creates and maps a tag when its slug is available', async () => {
    tagRepository.findOne.mockResolvedValue(null);
    tagRepository.create.mockReturnValue({
      id: 7,
      slug: 'solo-travel',
      label: '혼자 여행',
    });
    tagRepository.save.mockResolvedValue({
      id: 7,
      slug: 'solo-travel',
      label: '혼자 여행',
    });

    await expect(
      service.createOne({ slug: 'solo-travel', label: '혼자 여행' }),
    ).resolves.toEqual({ id: 7, slug: 'solo-travel', label: '혼자 여행' });
    expect(tagRepository.create).toHaveBeenCalledWith({
      slug: 'solo-travel',
      label: '혼자 여행',
    });
  });

  it('rejects a duplicate tag slug before creating a row', async () => {
    tagRepository.findOne.mockResolvedValue({ id: 7, slug: 'solo-travel' });

    await expect(
      service.createOne({ slug: 'solo-travel', label: '혼자 여행' }),
    ).rejects.toMatchObject({ code: ErrorCode.BAD_REQUEST });
    expect(tagRepository.create).not.toHaveBeenCalled();
  });

  it('removes an existing tag', async () => {
    const tag = { id: 7, slug: 'solo-travel' };
    tagRepository.findOne.mockResolvedValue(tag);

    await expect(service.remove('solo-travel')).resolves.toEqual({ ok: true });
    expect(tagRepository.remove).toHaveBeenCalledWith(tag);
  });

  it('rejects removal of a tag that does not exist', async () => {
    tagRepository.findOne.mockResolvedValue(null);

    await expect(service.remove('missing')).rejects.toMatchObject({
      code: ErrorCode.RESOURCE_NOT_FOUND,
    });
    expect(tagRepository.remove).not.toHaveBeenCalled();
  });
});
