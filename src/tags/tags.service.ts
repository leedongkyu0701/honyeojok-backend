import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dtos/tag.dto';
import { TagResponse } from './dtos/tag.response';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  async createMany(dto: CreateTagDto[]): Promise<TagResponse[]> {
    const createdTags: TagResponse[] = [];

    for (const tagDto of dto) {
      const existingTag = await this.tagRepo.findOne({
        where: { slug: tagDto.slug },
      });
      if (existingTag) {
        throw BaseException.badRequest(
          `Tag with slug '${tagDto.slug}' already exists`,
          ErrorCode.BAD_REQUEST,
        );
      }

      const tag = this.tagRepo.create({
        slug: tagDto.slug,
        label: tagDto.label,
      });
      const savedTag = await this.tagRepo.save(tag);
      createdTags.push({
        id: savedTag.id,
        slug: savedTag.slug,
        label: savedTag.label,
      });
    }

    return createdTags;
  }

  async findAll(): Promise<TagResponse[]> {
    const tags = await this.tagRepo.find({
      order: { label: 'ASC' },
    });

    return tags.map((t) => ({ id: t.id, slug: t.slug, label: t.label }));
  }

  async remove(slug: string): Promise<{ ok: true }> {
    const tag = await this.tagRepo.findOne({ where: { slug } });
    if (!tag)
      throw BaseException.notFound(
        'Tag not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );

    await this.tagRepo.remove(tag);
    return { ok: true };
  }
}
