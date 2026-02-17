import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Spot } from './spot.entity';
import { Destination } from '../destinations/destination.entity';
import { Tag } from 'src/tags/tag.entity';

import { CreateSpotDto } from './dtos/create-spot.dto';
import { FindSpotsQuery } from './dtos/find-spot.query';
import { SpotCardResponse } from './dtos/spot-card.response';
import { SpotDetailResponse } from './dtos/spot-detail.response';
import { FindHotSpotsResponse } from './dtos/find-hot.response';

import { SpotCategory } from 'src/types/spot';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  private toCard(spot: Spot): SpotCardResponse {
    return {
      id: spot.id,
      slug: spot.slug,
      name: spot.name,
      summary: spot.summary,
      lat: spot.lat ?? null,
      lng: spot.lng ?? null,
      category: spot.category ?? SpotCategory.ETC,
      imageUrl: spot.imageUrl ?? null,
      tags: (spot.tags ?? []).map((t) => ({
        slug: t.slug,
        label: t.label,
        id: t.id,
      })),
      destination: {
        id: spot.destination.id,
        slug: spot.destination.slug,
        name: spot.destination.name,
      },
    };
  }

  private toDetail(spot: Spot): SpotDetailResponse {
    return {
      id: spot.id,
      slug: spot.slug,
      name: spot.name,
      category: spot.category ?? SpotCategory.ETC,
      lat: spot.lat ?? null,
      lng: spot.lng ?? null,

      description: spot.description,
      honyeoTip: spot.honyeoTip ?? null,

      imageUrl: spot.imageUrl ?? null,
      imageSource: spot.imageSource ?? null,
      imageCredit: spot.imageCredit ?? null,

      address: spot.address ?? null,
      externalUrl: spot.externalUrl ?? null,

      tags: (spot.tags ?? []).map((t) => ({
        slug: t.slug,
        label: t.label,
        id: t.id,
      })),

      destination: {
        id: spot.destination.id,
        slug: spot.destination.slug,
        name: spot.destination.name,
      },
    };
  }

  async findByQuery(
    query: FindSpotsQuery,
    region: string,
  ): Promise<{ data: SpotCardResponse[]; totalPages: number }> {
    if (!region?.trim()) {
      throw BaseException.badRequest(
        '지역이 누락되었습니다.',
        ErrorCode.BAD_REQUEST,
      );
    }

    const page = Math.max(1, query.page ?? 1);
    const take = Math.min(8, Math.max(1, query.take ?? 8));
    const skip = (page - 1) * take;

    const qb = this.spotRepository
      .createQueryBuilder('spot')
      .innerJoinAndSelect('spot.destination', 'destination')
      .leftJoinAndSelect('spot.tags', 'tag') // 태그가 없는 스팟도 가져와야하므로 leftJoin
      .where('destination.slug = :region', { region });

    if (query.category) {
      qb.andWhere('spot.category = :category', { category: query.category });
    }

    qb.orderBy('spot.isRecommended', 'DESC')
      .addOrderBy('spot.id', 'DESC')
      .skip(skip)
      .take(take)
      .distinct(true);

    const [spots, total] = await qb.getManyAndCount();
    const totalPages = Math.max(1, Math.ceil(total / take));

    return {
      totalPages,
      data: spots.map((s) => this.toCard(s)),
    };
  }

  async findHot(takePerCategory = 10): Promise<FindHotSpotsResponse> {
    const categories: SpotCategory[] = [
      SpotCategory.FOOD,
      SpotCategory.CAFE,
      SpotCategory.DRINK,
      SpotCategory.ACTIVITY,
      SpotCategory.NATURE,
      SpotCategory.ETC,
    ];

    const results = await Promise.all(
      categories.map(async (category) => {
        const spots = await this.spotRepository.find({
          where: { category },
          relations: ['destination', 'tags'],
          order: { isRecommended: 'DESC', id: 'DESC' },
          take: takePerCategory,
        });

        return [category, spots.map((s) => this.toCard(s))] as const;
      }),
    );

    const response: FindHotSpotsResponse = {
      food: [],
      cafe: [],
      drink: [],
      activity: [],
      nature: [],
      etc: [],
    };

    for (const [category, items] of results) {
      if (category === SpotCategory.FOOD) response.food = items;
      else if (category === SpotCategory.CAFE) response.cafe = items;
      else if (category === SpotCategory.DRINK) response.drink = items;
      else if (category === SpotCategory.ACTIVITY) response.activity = items;
      else if (category === SpotCategory.NATURE) response.nature = items;
      else if (category === SpotCategory.ETC) response.etc = items;
    }

    return response;
  }

  async findRecommended(): Promise<SpotCardResponse[]> {
    const spots = await this.spotRepository.find({
      where: { isRecommended: true },
      relations: ['destination', 'tags'],
      order: { id: 'DESC' },
      take: 6,
    });

    return spots.map((s) => this.toCard(s));
  }

  async findById(id: number): Promise<SpotDetailResponse> {
    if (!Number.isFinite(id) || id <= 0) {
      throw BaseException.badRequest('Invalid id', ErrorCode.BAD_REQUEST);
    }

    const spot = await this.spotRepository.findOne({
      where: { id },
      relations: ['destination', 'tags'],
    });

    if (!spot) {
      throw BaseException.notFound(
        'Spot not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    return this.toDetail(spot);
  }

  async createOne(dto: CreateSpotDto): Promise<Spot> {
    return this.spotRepository.manager.transaction(async (m) => {
      const spotRepo = m.getRepository(Spot);
      const destinationRepo = m.getRepository(Destination);
      const tagRepo = m.getRepository(Tag);

      const destination = await destinationRepo.findOne({
        where: { slug: dto.destinationSlug },
      });

      if (!destination) {
        throw BaseException.notFound(
          'Destination not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      const spot = spotRepo.create({
        name: dto.name,
        slug: dto.slug,
        summary: dto.summary,
        category: dto.category ?? SpotCategory.ETC,
        description: dto.description,
        lat: dto.lat,
        lng: dto.lng,
        honyeoTip: dto.honyeoTip,
        imageUrl: dto.imageUrl,
        imageSource: dto.imageSource,
        imageCredit: dto.imageCredit,
        address: dto.address,
        externalUrl: dto.externalUrl,
        isRecommended: dto.isRecommended ?? false,
        destination: destination,
      });

      if (dto.tagSlugs?.length) {
        const tags = await tagRepo.find({ where: { slug: In(dto.tagSlugs) } });

        if (tags.length !== dto.tagSlugs.length) {
          const found = new Set(tags.map((t) => t.slug));
          const missing = dto.tagSlugs.filter((s) => !found.has(s));
          throw new BadRequestException(
            `Invalid tag slugs: ${missing.join(', ')}`,
          );
        }

        spot.tags = tags;
      } else {
        spot.tags = [];
      }

      return spotRepo.save(spot);
    });
  }
}
