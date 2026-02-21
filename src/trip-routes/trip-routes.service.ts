import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { TripRoute } from './trip-route.entity';
import { Destination } from '../destinations/destination.entity';
import { CreateTripRouteDto } from './dtos/create-trip-route.dto';
import { TripRoutesCardResponse } from './dtos/trip-routes-card.response';
import { TripRouteDetailResponse } from './dtos/trip-routes-detail.response';
import { Bookmark } from './bookmark.entity';
import { User } from '../user/user.entity';
import { Tag } from '../tags/tag.entity';
import { Spot } from 'src/spots/spot.entity';
import { TripRouteDay } from './trip-routes-day.entity';
import { TripRouteItem } from './trip-route-item.entity';
import { DataSource } from 'typeorm';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';
import { SpotCategory } from 'src/types/spot';
import { GeoPoint } from 'src/types/util';
import { SpotService } from 'src/spots/spot.service';
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

    private readonly spotService: SpotService,
  ) {}

  async findHotRoutes(): Promise<TripRoutesCardResponse[]> {
    const routes = await this.tripRouteRepo.find({
      order: { bookmarkCount: 'DESC', id: 'DESC' },
      relations: ['destination'],
      take: 6,
    });
    return routes.map((route) => ({
      id: route.id,
      slug: route.slug,
      title: route.title,
      summary: route.summary,
      days: route.days,
      regionSlug: route.destination.slug,
      bookmarkCount: route.bookmarkCount,
    }));
  }

  // 지역 slug로 여행 루트 목록 조회
  async findByRegion(region: string): Promise<TripRoutesCardResponse[]> {
    const destination = await this.destinationRepo.findOne({
      where: { slug: region },
      select: ['id', 'slug'],
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
      order: { bookmarkCount: 'DESC', id: 'DESC' },
      relations: ['destination'],
    });

    return routes.map((route) => ({
      id: route.id,
      slug: route.slug,
      title: route.title,
      summary: route.summary,
      days: route.days,
      regionSlug: route.destination.slug,
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
      select: ['id', 'slug'],
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
      .leftJoinAndSelect('item.spot', 'spot')
      .where('route.slug = :slug', { slug })
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
      title: route.title,
      summary: route.summary,
      honyeoTip: route.honyeoTip ?? null,
      days: route.days,
      bookmarkCount: route.bookmarkCount,
      bookmarkedByMe,
      honyeoCost: route.honyeoCost ?? null,

      tags: (route.tags ?? []).map((t) => ({
        id: t.id,
        slug: t.slug,
        label: t.label,
      })),

      daysPlan: (route.daysPlan ?? []).map((d) => ({
        id: d.id,
        dayNumber: d.dayNumber,
        title: d.title,
        note: d.note,

        items: (d.items ?? []).map((i) => ({
          id: i.id,
          order: i.order,
          recommendedLevel: i.recommendedLevel,
          title: i.title,
          description: i.description,
          imageUrl: i.imageUrl ?? null,
          imageCredit: i.imageCredit ?? null,
          lat: Number(i.lat) || null,
          lng: Number(i.lng) || null,
          address: i.address ?? null,
          startTime: i.startTime ?? null,
          endTime: i.endTime ?? null,
          externalUrl: i.externalUrl ?? null,

          spot: i.spot
            ? {
                id: i.spot.id,
                slug: i.spot.slug,
              }
            : undefined,
        })),
      })),
    };
  }

  async getNearbySpots(
    routeSlug: string,
    radiusKm: number,
    categories?: SpotCategory[],
    limit?: number,
  ) {
    const route = await this.tripRouteRepo.findOne({
      where: { slug: routeSlug },
      relations: { daysPlan: { items: { spot: true } } },
    });
    if (!route) {
      throw BaseException.notFound(
        'TripRoute not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const points = this.collectRoutePoints(route);

    if (points.length === 0) {
      return [];
    }

    // ✅ 루트에 이미 포함된 spotId 제외 목록
    const excludeSpotIds = new Set<number>();
    for (const day of route.daysPlan ?? []) {
      for (const item of day.items ?? []) {
        if (typeof item.spotId === 'number') excludeSpotIds.add(item.spotId);
      }
    }

    return this.spotService.findNearbyByPoints({
      destinationId: route.destinationId,
      points,
      radiusKm,
      categories,
      limit: limit ?? 10,
      excludeSpotIds: [...excludeSpotIds], // ✅ 추가
    });
  }

  private collectRoutePoints(route: TripRoute): GeoPoint[] {
    const raw: GeoPoint[] = [];

    for (const day of route.daysPlan ?? []) {
      for (const item of day.items ?? []) {
        const lat = item.lat ?? item.spot?.lat ?? null;
        const lng = item.lng ?? item.spot?.lng ?? null;
        if (typeof lat === 'number' && typeof lng === 'number') {
          raw.push({ lat, lng });
        }
      }
    }

    // 중복 제거(너무 많은 points 방지)
    const uniq = new Map<string, GeoPoint>();
    for (const p of raw) {
      const key = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;
      if (!uniq.has(key)) uniq.set(key, p);
    }

    // 혹시 points가 너무 많아지면 제한
    const pts = Array.from(uniq.values());
    return pts.length > 30 ? pts.slice(0, 30) : pts;
  }

  async createOne(dto: CreateTripRouteDto) {
    return this.dataSource.transaction(async (m) => {
      const destinationRepo = m.getRepository(Destination);
      const tripRouteRepo = m.getRepository(TripRoute);
      const dayRepo = m.getRepository(TripRouteDay);
      const itemRepo = m.getRepository(TripRouteItem);
      const tagRepo = m.getRepository(Tag);
      const spotRepo = m.getRepository(Spot);

      const destination = await destinationRepo.findOne({
        where: { slug: dto.destinationSlug },
      });

      if (!destination) {
        throw BaseException.notFound(
          'Destination not found',
          ErrorCode.RESOURCE_NOT_FOUND,
        );
      }
      // 1. 태그들 조회
      const tags = dto.tagSlugs?.length
        ? await tagRepo.find({ where: { slug: In(dto.tagSlugs) } })
        : [];

      if (dto.tagSlugs?.length && tags.length !== dto.tagSlugs.length) {
        const found = new Set(tags.map((t) => t.slug));
        const missing = dto.tagSlugs.filter((s) => !found.has(s));
        throw new BadRequestException(
          `Invalid tag slugs: ${missing.join(', ')}`,
        );
      }

      // 2. 여행 루트 생성
      const tripRoute = tripRouteRepo.create({
        slug: dto.slug,
        title: dto.title,
        summary: dto.summary,
        honyeoTip: dto.honyeoTip,
        days: dto.days,
        destination: destination,
        bookmarkCount: 0,
        honyeoCost: dto.honyeoCost,
        tags: tags,
      });

      await tripRouteRepo.save(tripRoute);

      // 2.5) SpotSlug들 미리 로드(N+1 방지)
      const spotSlugs = (dto.daysPlan ?? [])
        .flatMap((d) => d.items ?? [])
        .map((it) => it.spotSlug)
        .filter((v): v is string => !!v);

      const spotMap = new Map<string, Spot>();
      if (spotSlugs.length) {
        const spots = await spotRepo.find({
          where: { slug: In([...new Set(spotSlugs)]) },
        });
        for (const s of spots) spotMap.set(s.slug, s);
      }

      // 3. daysPlan 생성
      const daysPlanEntities: TripRouteDay[] = [];
      for (const dayDto of dto.daysPlan ?? []) {
        const dayEntity = dayRepo.create({
          dayNumber: dayDto.dayNumber,
          title: dayDto.title,
          note: dayDto.note,
          tripRoute: tripRoute,
        });
        await dayRepo.save(dayEntity);

        // 4. 각 day의 items 생성
        const itemEntities: TripRouteItem[] = [];
        for (const itemDto of dayDto.items ?? []) {
          const spot = itemDto.spotSlug
            ? spotMap.get(itemDto.spotSlug)
            : undefined;
          if (itemDto.spotSlug && !spot) {
            throw BaseException.notFound(
              `Spot not found: ${itemDto.spotSlug}`,
              ErrorCode.RESOURCE_NOT_FOUND,
            );
          }

          const imageUrl = spot?.imageUrl ?? itemDto.imageUrl;
          const imageCredit = spot?.imageCredit ?? itemDto.imageCredit;
          const lat = spot?.lat ?? itemDto.lat;
          const lng = spot?.lng ?? itemDto.lng;
          const address = spot?.address ?? itemDto.address;

          const itemEntity = itemRepo.create({
            order: itemDto.order,
            recommendedLevel: itemDto.recommendedLevel,
            title: itemDto.title,
            description: itemDto.description,
            imageUrl: imageUrl,
            imageCredit: imageCredit,
            lat: lat,
            lng: lng,
            address: address,
            startTime: itemDto.startTime,
            endTime: itemDto.endTime,
            externalUrl: itemDto.externalUrl,
            spot: spot ?? undefined,
            day: dayEntity,
          });
          itemEntities.push(itemEntity);
        }
        if (itemEntities.length) {
          await itemRepo.save(itemEntities);
        }
        dayEntity.items = itemEntities;

        daysPlanEntities.push(dayEntity);
      }
      tripRoute.daysPlan = daysPlanEntities;

      return tripRouteRepo.save(tripRoute);
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
