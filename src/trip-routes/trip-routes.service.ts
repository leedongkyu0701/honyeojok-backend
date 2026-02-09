// src/trip-routes/trip-routes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripRoute } from './trip-route.entity';
import { Destination } from '../destinations/destination.entity';
import { CreateTripRouteDto } from './dtos/create-trip-route.dto';
import { TripRoutesCardResponse } from './dtos/trip-routes-card.response';
import { TripRouteDetailResponse } from './dtos/trip-routes-detail.response';
import { Bookmark } from './bookmark.entity';
import { User } from '../user/user.entity';
import { Tag } from '../tags/tag.entity';
import { TripRouteDay } from './trip-routes-day.entity';
import { TripRouteItem } from './trip-route-item.entity';
import { DataSource } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class TripRoutesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TripRoute)
    private readonly tripRouteRepo: Repository<TripRoute>,

    @InjectRepository(Destination)
    private readonly destinationRepo: Repository<Destination>,

    @InjectRepository(Bookmark)
    private readonly bookmarkRepo: Repository<Bookmark>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,

    @InjectRepository(TripRouteDay)
    private readonly tripRouteDayRepo: Repository<TripRouteDay>,

    @InjectRepository(TripRouteItem)
    private readonly tripRouteItemRepo: Repository<TripRouteItem>,
  ) {}

  async findHotRoutes(): Promise<TripRoutesCardResponse[]> {
    const routes = await this.tripRouteRepo.find({
      order: { bookmarkCount: 'DESC' },
      take: 5,
    });
    return routes.map((route) => ({
      id: route.id,
      slug: route.slug,
      title: route.title,
      summary: route.summary,
      days: route.days,
      region: route.region,
      bookmarkCount: route.bookmarkCount,
    }));
  }

  // 지역 slug로 여행 루트 목록 조회
  async findByRegion(region: string): Promise<TripRoutesCardResponse[]> {
    const destination = await this.destinationRepo.findOne({
      where: { slug: region },
    });

    if (!destination) {
      throw BaseException.notFound(
        'Destination not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const routes = await this.tripRouteRepo.find({
      where: {
        destination: destination,
      },
      order: { bookmarkCount: 'DESC' },
    });

    return routes.map((route) => ({
      id: route.id,
      slug: route.slug,
      title: route.title,
      summary: route.summary,
      days: route.days,
      region: route.region,
      bookmarkCount: route.bookmarkCount,
    }));
  }

  // 지역 + 루트 slug로 상세 조회
  async findByRegionAndSlug(
    region: string,
    slug: string,
    userId?: number,
  ): Promise<TripRouteDetailResponse> {
    const destination = await this.destinationRepo.findOne({
      where: { slug: region },
    });

    if (!destination) {
      throw BaseException.notFound(
        'Destination not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const route = await this.tripRouteRepo
      .createQueryBuilder('route')
      .leftJoinAndSelect('route.tags', 'tag')
      .leftJoinAndSelect('route.daysPlan', 'day')
      .leftJoinAndSelect('day.items', 'item')
      .where('route.slug = :slug', { slug })
      .andWhere('route.destinationId = :destinationId', {
        destinationId: destination.id,
      })
      .orderBy('day.dayNumber', 'ASC')
      .addOrderBy('item.order', 'ASC')
      .getOne();

    if (!route) {
      throw BaseException.notFound(
        'TripRoute not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    let bookmarkedByMe = false;
    // console.log('userId:', userId);
    if (userId) {
      const existingBookmark = await this.bookmarkRepo.findOne({
        where: {
          tripRoute: { id: route.id },
          user: { id: userId },
        },
      });

      if (existingBookmark) {
        bookmarkedByMe = true;
      }
    }

    return {
      id: route.id,
      slug: route.slug,
      region: route.region,
      title: route.title,
      summary: route.summary,
      days: route.days,
      bookmarkCount: route.bookmarkCount,
      bookmarkedByMe,

      tags: (route.tags ?? []).map((t) => ({
        slug: t.slug,
        label: t.label,
      })),

      daysPlan: (route.daysPlan ?? []).map((d) => ({
        id: d.id,
        dayNumber: d.dayNumber,
        title: d.title ?? undefined,
        note: d.note ?? undefined,

        items: (d.items ?? []).map((i) => ({
          id: i.id,
          type: i.type,
          order: i.order,
          recommendedLevel: i.recommendedLevel,
          title: i.title,
          description: i.description ?? undefined,
          imageUrl: i.imageUrl ?? undefined,
          lat: i.lat ?? undefined,
          lng: i.lng ?? undefined,
          address: i.address ?? undefined,
          startTime: i.startTime ?? undefined,
          endTime: i.endTime ?? undefined,
          externalUrl: i.externalUrl ?? undefined,
        })),
      })),
    };
  }

  async createOne(data: CreateTripRouteDto) {
    return this.dataSource.transaction(async (manager) => {
      const destination = await manager.findOne(Destination, {
        where: { slug: data.region },
      });

      if (!destination) {
        throw BaseException.notFound(
          `Destination with slug ${data.region} not found`,
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }
      // 1. 부모 먼저 저장
      const route = manager.create(TripRoute, {
        slug: data.slug,
        title: data.title,
        summary: data.summary,
        days: data.days,
        region: data.region,
        destination: destination,
        bookmarkCount: 0,
      });
      const savedRoute = await manager.save(route);

      // 2. tags 저장
      if (data.tagSlugs && data.tagSlugs.length > 0) {
        const tags = await manager.find(Tag, {
          where: data.tagSlugs.map((slug) => ({ slug })),
        });

        if (tags.length !== data.tagSlugs.length) {
          throw BaseException.badRequest(
            `One or more tags not found`,
            ErrorCode.BAD_REQUEST,
          );
        }
        savedRoute.tags = tags;
        await manager.save(savedRoute);
      }

      // 3. daysPlan 저장
      const days = data.daysPlan.map((d) => {
        const day = manager.create(TripRouteDay, {
          dayNumber: d.dayNumber,
          title: d.title,
          note: d.note,
          tripRoute: savedRoute,
        });
        return day;
      });
      const savedDays = await manager.save(days);

      // 4. items 저장
      const dayMap = new Map(savedDays.map((d) => [d.dayNumber, d]));
      for (const d of data.daysPlan) {
        const dayEntity = dayMap.get(d.dayNumber);
        if (!dayEntity) continue;
        const orders = d.items.map((i) => i.order);
        const uniqueOrders = new Set(orders);
        if (orders.length !== uniqueOrders.size) {
          throw BaseException.badRequest(
            `Duplicate order values in day ${d.dayNumber}`,
            ErrorCode.BAD_REQUEST,
          );
        }

        const items = d.items.map((i) => {
          const item = manager.create(TripRouteItem, {
            day: dayEntity,
            type: i.type,
            order: i.order,
            recommendedLevel: i.recommendedLevel,
            title: i.title,
            description: i.description,
            imageUrl: i.imageUrl,
            lat: i.lat,
            lng: i.lng,
            address: i.address,
            startTime: i.startTime,
            endTime: i.endTime,
            externalUrl: i.externalUrl,
          });
          return item;
        });
        await manager.save(items);
      }

      return savedRoute;
    });
  }

  async createMany(data: CreateTripRouteDto[]) {
    return this.dataSource.transaction(async () => {
      const createdRoutes: TripRoute[] = [];
      for (const dto of data) {
        const route = await this.createOne(dto);
        createdRoutes.push(route);
      }
      return createdRoutes;
    });
  }

  async toggleBookmark(
    userId: number,
    tripRouteSlug: string,
  ): Promise<{ bookmarked: boolean; bookmarkCount: number }> {
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id: userId } });
      const tripRoute = await manager.findOne(TripRoute, {
        where: { slug: tripRouteSlug },
      });

      if (!user || !tripRoute) {
        throw BaseException.notFound(
          'User or TripRoute not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }

      const existingBookmark = await manager.findOne(Bookmark, {
        where: {
          user: { id: userId },
          tripRoute: { slug: tripRouteSlug },
        },
      });

      if (existingBookmark) {
        // 북마크가 이미 존재하면 삭제
        await manager.remove(existingBookmark);
        await manager.decrement(
          TripRoute,
          { slug: tripRouteSlug },
          'bookmarkCount',
          1,
        );
        const updatedRoute = await manager.findOne(TripRoute, {
          where: { slug: tripRouteSlug },
        });
        return {
          bookmarked: false,
          bookmarkCount: updatedRoute!.bookmarkCount,
        };
      } else {
        // 북마크가 없으면 생성
        const newBookmark = manager.create(Bookmark, { user, tripRoute });
        await manager.save(newBookmark);
        await manager.increment(
          TripRoute,
          { slug: tripRouteSlug },
          'bookmarkCount',
          1,
        );
        const updatedRoute = await manager.findOne(TripRoute, {
          where: { slug: tripRouteSlug },
        });
        return { bookmarked: true, bookmarkCount: updatedRoute!.bookmarkCount };
      }
    });
  }

  async addBookmark(userId: number, tripRouteSlug: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const tripRoute = await this.tripRouteRepo.findOne({
      where: { slug: tripRouteSlug },
    });

    if (!user || !tripRoute) {
      throw BaseException.notFound(
        'User or TripRoute not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const existingBookmark = await this.bookmarkRepo.findOne({
      where: {
        user: { id: userId },
        tripRoute: { slug: tripRouteSlug },
      },
    });

    if (existingBookmark) {
      return {
        bookmarked: true,
        bookmarkCount: existingBookmark.tripRoute.bookmarkCount,
      };
    }

    const newBookmark = this.bookmarkRepo.create({ user, tripRoute });
    await this.bookmarkRepo.save(newBookmark);
    await this.tripRouteRepo.increment(
      { slug: tripRouteSlug },
      'bookmarkCount',
      1,
    );

    const updatedRoute = await this.tripRouteRepo.findOne({
      where: { slug: tripRouteSlug },
    });

    return { bookmarked: true, bookmarkCount: updatedRoute!.bookmarkCount };
  }

  async removeBookmark(userId: number, tripRouteSlug: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const tripRoute = await this.tripRouteRepo.findOne({
      where: { slug: tripRouteSlug },
    });

    if (!user || !tripRoute) {
      throw BaseException.notFound(
        'User or TripRoute not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const existingBookmark = await this.bookmarkRepo.findOne({
      where: {
        user: { id: userId },
        tripRoute: { slug: tripRouteSlug },
      },
    });

    if (!existingBookmark) {
      throw BaseException.badRequest(
        'Bookmark does not exist',
        ErrorCode.BAD_REQUEST,
      );
    }

    await this.bookmarkRepo.remove(existingBookmark);
    await this.tripRouteRepo.decrement(
      { slug: tripRouteSlug },
      'bookmarkCount',
      1,
    );

    const updatedRoute = await this.tripRouteRepo.findOne({
      where: { slug: tripRouteSlug },
    });

    return { bookmarked: false, bookmarkCount: updatedRoute!.bookmarkCount };
  }
}
