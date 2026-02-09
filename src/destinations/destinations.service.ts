// src/destinations/destinations.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Destination } from './destination.entity';
import { CreateDestinationDto } from './dtos/create-destination.dto';
import { DestinationMapResponse } from './dtos/destination-map.response';
import { DestinationCardResponse } from './dtos/destination-card.response';
import { DestinationByRegionResponse } from './dtos/destination-region.response';
import { FindDestinationsQuery } from './dtos/find-destinations.query';
import { TripRoute } from 'src/trip-routes/trip-route.entity';
import { Spot } from 'src/spots/spot.entity';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private repo: Repository<Destination>,
    @InjectRepository(TripRoute)
    private tripRouteRepo: Repository<TripRoute>,
    @InjectRepository(Spot)
    private spotRepo: Repository<Spot>,
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
        province: query.province,
      });
    }
    if (query.q) {
      const keyword = query.q.trim();
      qb.andWhere('destination.name ILIKE :name', { name: `%${keyword}%` });
    }
    if (sort === 'score' || sort === 'reviewCount') {
      qb.orderBy(`destination.${sort}`, 'DESC').addOrderBy(
        'destination.id',
        'ASC',
      );
    } else if (sort === 'rank') {
      qb.orderBy(`destination.${sort}`, 'ASC');
    }
    qb.skip(skip).take(take);

    const [destinations, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / take);

    const data = destinations.map((dest) => ({
      id: dest.id,
      slug: dest.slug,
      name: dest.name,
      score: dest.score,
      imageUrl: dest.imageUrl,
      province: dest.province,
      summary: dest.summary,
    }));

    return { data, totalPages };
  }

  async search(query: string) {
    const keyword = (query ?? '').trim();
    if (keyword.length === 0) {
      return [];
    }
    const destinations = await this.repo.find({
      where: { name: ILike(`%${keyword}%`) },
      take: 5,
    });
    if (destinations.length === 0) {
      return [];
    }
    return destinations.map((dest) => ({
      id: dest.id,
      slug: dest.slug,
      name: dest.name,
    }));
  }

  async findByRegion(region: string): Promise<DestinationByRegionResponse> {
    const destination = await this.repo.findOne({
      where: { slug: region },
    });

    if (!destination) {
      throw BaseException.notFound(
        'Destination not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const tripRoutes = await this.tripRouteRepo.find({
      where: { destination: { id: destination.id } },
      order: { bookmarkCount: 'DESC' },
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
      score: destination.score,
      imageUrl: destination.imageUrl,
      imageSource: destination.imageSource,
      imageCredit: destination.imageCredit,
      province: destination.province,
      difficulty: {
        food: destination.food,
        transport: destination.transport,
        safety: destination.safety,
        loneliness: destination.loneliness,
      },
      summary: destination.summary,
      routes: tripRoutes.map((route) => ({
        id: route.id,
        slug: route.slug,
        title: route.title,
        summary: route.summary,
        days: route.days,
        region: route.region,
        bookmarkCount: route.bookmarkCount,
      })),
      spots: spots.map((spot) => ({
        id: spot.id,
        slug: spot.slug,
        name: spot.name,
        note: spot.note ?? null,
        description: spot.description,
        imageUrl: spot.imageUrl ?? null,
        destination: {
          id: destination.id,
          slug: destination.slug,
          name: destination.name,
        },
        tags: spot.tags.map((tag) => ({ slug: tag.slug, label: tag.label })),
      })),
    };
  }

  async findRecommanded(): Promise<DestinationCardResponse[]> {
    const recommendedDestinations = await this.repo.find({
      order: { score: 'DESC' },
      take: 6,
    });

    return recommendedDestinations.map((dest) => ({
      id: dest.id,
      slug: dest.slug,
      name: dest.name,
      score: dest.score,
      imageUrl: dest.imageUrl,
      province: dest.province,
      summary: dest.summary,
    }));
  }

  async findWeekly(): Promise<DestinationCardResponse> {
    const weeklyDestination = await this.repo.findOne({
      where: { rank: 1 },
    });
    if (!weeklyDestination) {
      throw BaseException.notFound(
        'Weekly destination not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return {
      id: weeklyDestination.id,
      slug: weeklyDestination.slug,
      name: weeklyDestination.name,
      score: weeklyDestination.score,
      imageUrl: weeklyDestination.imageUrl,
      province: weeklyDestination.province,
      summary: weeklyDestination.summary,
    };
  }

  async findMap(): Promise<DestinationMapResponse[]> {
    const destinations = await this.repo.find({
      select: ['id', 'slug', 'name', 'latitude', 'longitude', 'score'],
    });
    return destinations;
  }

  createMany(data: CreateDestinationDto[]) {
    const destinations = this.repo.create(data);
    return this.repo.save(destinations);
  }
}
