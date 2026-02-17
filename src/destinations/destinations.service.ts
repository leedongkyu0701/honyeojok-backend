// src/destinations/destinations.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, ILike } from 'typeorm';

import { Destination } from './destination.entity';
import { Tag } from 'src/tags/tag.entity';

import { CreateDestinationDto } from './dtos/create-destination.dto';
import { FindDestinationsQuery } from './dtos/find-destinations.query';

import { DestinationCardResponse } from './dtos/destination-card.response';
import { DestinationMapResponse } from './dtos/destination-map.response';
import { DestinationDetailResponse } from './dtos/destination-detail.response';

import { TripRoute } from 'src/trip-routes/trip-route.entity';
import { Spot } from 'src/spots/spot.entity';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { SpotCategory } from 'src/types/spot';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private readonly repo: Repository<Destination>,
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    @InjectRepository(TripRoute)
    private readonly tripRouteRepo: Repository<TripRoute>,
    @InjectRepository(Spot)
    private readonly spotRepo: Repository<Spot>,
  ) {}

  async findByQuery(
    query: FindDestinationsQuery,
  ): Promise<{ data: DestinationCardResponse[]; totalPages: number }> {
    const page = Math.max(1, query.page ?? 1);
    const take = Math.min(12, Math.max(1, query.take ?? 12));
    const skip = (page - 1) * take;
    const sort = query.sort ?? 'rank';

    const qb = this.repo.createQueryBuilder('destination');

    if (query.province) {
      qb.andWhere('destination.province = :province', {
        // 조건문
        province: query.province, // 값 바인딩
      });
    }

    // 태그 필터링 (OR 조건)
    // if (query.tags?.length) {
    //   qb.innerJoin('destination.tags', 'tag') // row 만들기
    //     .andWhere('tag.slug IN (:...tagSlugs)', { tagSlugs: query.tags })
    //     .distinct(true); // 조인 중복 방지
    // }

    // 정렬 규칙: rank는 ASC, score는 DESC
    if (sort === 'score') {
      qb.orderBy('destination.score', 'DESC').addOrderBy(
        'destination.id',
        'ASC',
      );
    } else {
      qb.orderBy('destination.rank', 'ASC').addOrderBy('destination.id', 'ASC');
    }

    qb.skip(skip).take(take);

    const [rows, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / take);

    return {
      totalPages,
      data: rows.map((d) => ({
        id: d.id,
        slug: d.slug,
        name: d.name,
        score: d.score,
        summary: d.summary,
        imageUrl: d.imageUrl ?? null,
      })),
    };
  }

  async findWeekly(): Promise<DestinationCardResponse> {
    const d = await this.repo.findOne({ where: { rank: 1 } });
    if (!d) {
      throw BaseException.notFound(
        'Weekly destination not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return {
      id: d.id,
      slug: d.slug,
      name: d.name,
      score: d.score,
      summary: d.summary,
      imageUrl: d.imageUrl ?? null,
    };
  }

  async findRecommended(take = 6): Promise<DestinationCardResponse[]> {
    const rows = await this.repo.find({ order: { score: 'DESC' }, take });
    return rows.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      score: d.score,
      summary: d.summary,
      imageUrl: d.imageUrl ?? null,
    }));
  }

  async findMap(): Promise<DestinationMapResponse[]> {
    const rows = await this.repo.find({
      select: [
        'id',
        'slug',
        'name',
        'latitude',
        'longitude',
        'score',
        'summary',
      ],
      // 필요한 필드만 선택
    });

    return rows.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      score: d.score,
      summary: d.summary,
      // TypeORM/Postgres decimal은 string으로 올 수 있어서 안전 변환
      latitude: Number(d.latitude),
      longitude: Number(d.longitude),
    }));
  }

  async findByRegion(region: string): Promise<DestinationDetailResponse> {
    const destination = await this.repo.findOne({
      where: { slug: region },
      relations: ['tags'],
    });

    if (!destination) {
      throw BaseException.notFound(
        'Destination not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const tripRoutes = await this.tripRouteRepo.find({
      where: { destination: { id: destination.id } },
      order: { bookmarkCount: 'DESC', id: 'DESC' },
      take: 3,
    });

    const spots = await this.spotRepo.find({
      where: { destination: { id: destination.id }, isRecommended: true },
      relations: ['tags'],
      order: { id: 'DESC' },
      take: 5,
    });

    return {
      id: destination.id,
      slug: destination.slug,
      name: destination.name,
      province: destination.province,
      score: destination.score,

      imageUrl: destination.imageUrl ?? null,
      imageSource: destination.imageSource ?? null,
      imageCredit: destination.imageCredit ?? null,

      summary: destination.summary,
      description: destination.description,

      difficulty: {
        food: destination.food,
        transport: destination.transport,
        safety: destination.safety,
        loneliness: destination.loneliness,
      },

      tags:
        destination.tags?.map((t) => ({
          id: t.id,
          slug: t.slug,
          label: t.label,
        })) ?? [],

      routes: tripRoutes.map((route) => ({
        id: route.id,
        slug: route.slug,
        title: route.title,
        summary: route.summary,
        days: route.days,
        regionSlug: destination.slug,
        bookmarkCount: route.bookmarkCount,
      })),

      spots: spots.map((spot) => ({
        id: spot.id,
        slug: spot.slug,
        name: spot.name,
        summary: spot.summary,
        lat: spot.lat ?? null,
        lng: spot.lng ?? null,
        category: spot.category ?? SpotCategory.ETC,
        imageUrl: spot.imageUrl ?? null,
        tags: (spot.tags ?? []).map((t) => ({
          id: t.id,
          slug: t.slug,
          label: t.label,
        })),
        destination: {
          id: destination.id,
          slug: destination.slug,
          name: destination.name,
        },
      })),
    };
  }

  async search(query: string) {
    const keyword = (query ?? '').trim();
    if (keyword.length === 0) {
      return [];
    }
    const destinations = await this.repo.find({
      select: ['id', 'slug', 'name'],
      where: { name: ILike(`%${keyword}%`) },
      order: { name: 'ASC' },
      take: 5,
    });
    if (destinations.length === 0) {
      return [];
    }
    return destinations;
  }

  async createOne(dto: CreateDestinationDto): Promise<Destination> {
    return this.repo.manager.transaction(async (m) => {
      const destinationRepo = m.getRepository(Destination);
      const tagRepo = m.getRepository(Tag);

      const destination = destinationRepo.create({
        slug: dto.slug,
        name: dto.name,
        province: dto.province,
        score: dto.score,
        rank: dto.rank,
        latitude: dto.latitude,
        longitude: dto.longitude,
        imageUrl: dto.imageUrl,
        imageSource: dto.imageSource,
        imageCredit: dto.imageCredit,
        summary: dto.summary,
        description: dto.description,
        food: dto.food,
        transport: dto.transport,
        safety: dto.safety,
        loneliness: dto.loneliness,
      });

      // tagSlugs가 있으면 연결
      if (dto.tagSlugs?.length) {
        const tags = await tagRepo.find({ where: { slug: In(dto.tagSlugs) } });

        // 없는 slug 섞이면 에러로 막는 게 운영에 안전
        if (tags.length !== dto.tagSlugs.length) {
          const found = new Set(tags.map((t) => t.slug));
          const missing = dto.tagSlugs.filter((s) => !found.has(s));
          throw new BadRequestException(
            `Invalid tag slugs: ${missing.join(', ')}`,
          );
        }

        destination.tags = tags;
      } else {
        destination.tags = [];
      }

      return destinationRepo.save(destination);
    });
  }
}
