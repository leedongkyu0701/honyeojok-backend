import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, ILike } from 'typeorm';

import { Destination } from './entities/destination.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';

import { CreateDestinationRequestDto } from './dto/request/create-destination.request.dto';
import { FindDestinationsQuery } from './dto/query/find-destinations.query.dto';

import { DestinationCardResponseDto } from './dto/response/destination-card.response.dto';
import { DestinationMapResponseDto } from './dto/response/destination-map.response.dto';
import { DestinationDetailResponseDto } from './dto/response/destination-detail.response.dto';

import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { SpotCategory } from 'src/modules/spots/enums/spot-category.enum';
import { DestinationMapper } from './mappers/destination.mapper';
import { RedisCacheService } from 'src/infrastructure/cache/redis/redis-cache.service';

export const DESTINATIONS_MAP_CACHE_KEY = 'cache:destinations:map:v1';
export const DESTINATIONS_MAP_CACHE_TTL_SECONDS = 300;

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private readonly repo: Repository<Destination>,
    @InjectRepository(TripRoute)
    private readonly tripRouteRepo: Repository<TripRoute>,
    @InjectRepository(Spot)
    private readonly spotRepo: Repository<Spot>,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async findByQuery(
    query: FindDestinationsQuery,
  ): Promise<{ data: DestinationCardResponseDto[]; totalPages: number }> {
    const page = Math.max(1, query.page ?? 1);
    const take = Math.min(12, Math.max(1, query.take ?? 12));
    const skip = (page - 1) * take;
    const sort = query.sort ?? 'rank';

    const qb = this.repo.createQueryBuilder('destination');

    if (query.province) {
      qb.andWhere('destination.province = :province', {
        province: query.province,
      });
    }

    // 정렬 규칙: rank는 ASC, score는 DESC
    if (sort === 'score') {
      qb.orderBy('destination.score', 'DESC').addOrderBy(
        'destination.id',
        'DESC',
      );
    } else {
      qb.orderBy('destination.rank', 'ASC').addOrderBy(
        'destination.id',
        'DESC',
      );
    }

    qb.skip(skip).take(take);

    const [rows, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / take);

    return {
      totalPages,
      data: rows.map((destination) => DestinationMapper.toCard(destination)),
    };
  }

  async findWeekly(): Promise<DestinationCardResponseDto> {
    const d = await this.repo.findOne({ where: { rank: 1 } });
    if (!d) {
      throw BaseException.notFound(
        'Weekly destination not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return DestinationMapper.toCard(d);
  }

  async findRecommended(take = 6): Promise<DestinationCardResponseDto[]> {
    const rows = await this.repo.find({ order: { score: 'DESC' }, take });
    return rows.map((destination) => DestinationMapper.toCard(destination));
  }

  async findMap(): Promise<DestinationMapResponseDto[]> {
    const cached = await this.redisCacheService.getJson<
      DestinationMapResponseDto[]
    >(DESTINATIONS_MAP_CACHE_KEY);

    if (cached !== null) {
      return cached;
    }

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
      relations: ['tags'],
    });

    const mapDestinations = rows.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      score: d.score,
      summary: d.summary,
      latitude: d.latitude,
      longitude: d.longitude,
      tagSlugs: d.tags?.map((t) => t.slug) ?? [],
    }));

    await this.redisCacheService.setJson(
      DESTINATIONS_MAP_CACHE_KEY,
      mapDestinations,
      DESTINATIONS_MAP_CACHE_TTL_SECONDS,
    );

    return mapDestinations;
  }

  async findByRegion(region: string): Promise<DestinationDetailResponseDto> {
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
      where: { destinationId: destination.id },
      order: { bookmarkCount: 'DESC', id: 'DESC' },
      take: 3,
    });

    const spots = await this.spotRepo.find({
      where: { destinationId: destination.id, isRecommended: true },
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

  async createOne(dto: CreateDestinationRequestDto): Promise<Destination> {
    const destination = await this.repo.manager.transaction(async (m) => {
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

    // Keep this after commit; future destination or map-tag writes need this invalidation too.
    await this.redisCacheService.delete(DESTINATIONS_MAP_CACHE_KEY);

    return destination;
  }
}
