import type { EntityManager } from 'typeorm';
import { In } from 'typeorm';
import { tripRoutes } from '../data/trip-routes';

import { TripRoute } from '../../trip-routes/trip-route.entity';
import { TripRouteDay } from '../../trip-routes/trip-routes-day.entity';
import { TripRouteItem } from '../../trip-routes/trip-route-item.entity';
import { Destination } from '../../destinations/destination.entity';
import { Tag } from '../../tags/tag.entity';

export async function seedTripRoutes(m: EntityManager) {
  const routeRepo = m.getRepository(TripRoute);
  const dayRepo = m.getRepository(TripRouteDay);
  const itemRepo = m.getRepository(TripRouteItem);
  const destRepo = m.getRepository(Destination);
  const tagRepo = m.getRepository(Tag);

  const dests = await destRepo.find({ select: ['id', 'slug'] });
  const destBySlug = new Map(dests.map((d) => [d.slug, d.id]));

  const allTags = await tagRepo.find({ select: ['id', 'slug', 'label'] });
  const tagBySlug = new Map(allTags.map((t) => [t.slug, t]));

  for (const r of tripRoutes) {
    // ✅ FK는 destinationSlug 기준이 안전 (region은 표시용일 수 있음)
    const destinationId = destBySlug.get(r.destinationSlug);
    if (!destinationId) {
      throw new Error(`Destination not found: ${r.destinationSlug}`);
    }

    const tagEntities = (r.tagSlugs ?? [])
      .map((slug) => tagBySlug.get(slug))
      .filter(Boolean) as Tag[];

    // 1) Route: slug 기준 idempotent 갱신
    const existingRoute = await routeRepo.findOne({
      where: { slug: r.slug },
      relations: ['tags'],
    });

    let route = existingRoute ?? routeRepo.create();

    route.slug = r.slug;
    route.region = r.region;
    route.title = r.title;
    route.summary = r.summary;
    route.days = r.days;

    // ✅ 추가된 필드 반영
    route.bookmarkCount = r.bookmarkCount ?? 0;

    // ✅ FK
    route.destinationId = destinationId;

    // ✅ ManyToMany
    route.tags = tagEntities;

    route = await routeRepo.save(route);

    // 2) day/item: 고정 시드면 "삭제 후 재삽입" 방식이 예측 가능
    const existingDays = await dayRepo.find({
      where: { tripRoute: { id: route.id } },
      select: ['id'],
    });

    if (existingDays.length > 0) {
      const dayIds = existingDays.map((d) => d.id);

      // ✅ day -> item FK delete
      await itemRepo.delete({ day: { id: In(dayIds) } });

      // ✅ route -> day delete
      await dayRepo.delete({ tripRoute: { id: route.id } });
    }

    for (const d of r.daysPlan) {
      // ✅ order 중복 방지
      const orders = d.items.map((i) => i.order);
      if (orders.length !== new Set(orders).size) {
        throw new Error(
          `Duplicate order: route=${route.slug}, day=${d.dayNumber}`,
        );
      }

      const day = dayRepo.create({
        tripRoute: route,
        dayNumber: d.dayNumber,
        title: d.title ?? undefined,
        note: d.note ?? undefined,
      });
      await dayRepo.save(day);

      const items = d.items.map((i) =>
        itemRepo.create({
          day,
          type: i.type,
          order: i.order,
          recommendedLevel: i.recommendedLevel,
          title: i.title,

          // ✅ 추가 옵션들 전부 반영
          description: i.description ?? undefined,
          imageUrl: i.imageUrl ?? undefined,
          lat: i.lat ?? undefined,
          lng: i.lng ?? undefined,
          address: i.address ?? undefined,
          startTime: i.startTime ?? undefined,
          endTime: i.endTime ?? undefined,
          externalUrl: i.externalUrl ?? undefined,
        }),
      );

      await itemRepo.save(items);
    }
  }
}
