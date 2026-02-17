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

  async createOne(dto: CreateTagDto): Promise<TagResponse> {
    const existingTag = await this.tagRepo.findOne({
      where: { slug: dto.slug },
    });
    if (existingTag) {
      throw BaseException.badRequest(
        `Tag with slug '${dto.slug}' already exists`,
        ErrorCode.BAD_REQUEST,
      );
    }

    const tag = this.tagRepo.create({
      slug: dto.slug,
      label: dto.label,
    });
    const savedTag = await this.tagRepo.save(tag);
    return {
      id: savedTag.id,
      slug: savedTag.slug,
      label: savedTag.label,
    };
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
