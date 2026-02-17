// src/seed/steps/04-trip-routes.step.ts
import type { EntityManager } from 'typeorm';
import { In } from 'typeorm';

import { tripRoutes } from '../data/trip-routes/index';

import { TripRoute } from '../../trip-routes/trip-route.entity';
import { TripRouteDay } from '../../trip-routes/trip-routes-day.entity';
import { TripRouteItem } from '../../trip-routes/trip-route-item.entity';
import { Destination } from '../../destinations/destination.entity';
import { Tag } from '../../tags/tag.entity';
import { Spot } from '../../spots/spot.entity';

export async function seedTripRoutes(m: EntityManager) {
  const routeRepo = m.getRepository(TripRoute);
  const dayRepo = m.getRepository(TripRouteDay);
  const itemRepo = m.getRepository(TripRouteItem);
  const destRepo = m.getRepository(Destination);
  const tagRepo = m.getRepository(Tag);
  const spotRepo = m.getRepository(Spot);

  // 1) Destination slug -> id (필요한 slug만)
  const destSlugs = Array.from(
    new Set(tripRoutes.map((r) => r.destinationSlug)),
  );
  const dests = await destRepo.find({
    where: { slug: In(destSlugs) },
    select: ['id', 'slug'],
  });
  const destIdBySlug = new Map(dests.map((d) => [d.slug, d.id]));
  const missingDest = destSlugs.filter((s) => !destIdBySlug.has(s));
  if (missingDest.length) {
    throw new Error(
      `seedTripRoutes: Destination not found: ${missingDest.join(', ')}`,
    );
  }

  // 2) Tag slug -> Tag (seed에서 쓰는 slug만)
  const allTagSlugs = Array.from(
    new Set(tripRoutes.flatMap((r) => r.tagSlugs ?? [])),
  );
  const tags =
    allTagSlugs.length === 0
      ? []
      : await tagRepo.find({
          where: { slug: In(allTagSlugs) },
          select: ['id', 'slug', 'label'],
        });
  const tagBySlug = new Map(tags.map((t) => [t.slug, t]));
  const missingTags = allTagSlugs.filter((s) => !tagBySlug.has(s));
  if (missingTags.length) {
    throw new Error(
      `seedTripRoutes: Missing tags (did you run seedTags first?): ${missingTags.join(', ')}`,
    );
  }

  // 3) Spot slug -> id (TripRouteItem.spotSlug용)
  const allSpotSlugs = Array.from(
    new Set(
      tripRoutes.flatMap((r) =>
        r.daysPlan.flatMap((d) => d.items.flatMap((i) => i.spotSlug ?? [])),
      ),
    ),
  );
  const spots =
    allSpotSlugs.length === 0
      ? []
      : await spotRepo.find({
          where: { slug: In(allSpotSlugs) },
          select: ['id', 'slug'],
        });
  const spotIdBySlug = new Map(spots.map((s) => [s.slug, s.id]));
  const missingSpots = allSpotSlugs.filter((s) => !spotIdBySlug.has(s));
  if (missingSpots.length) {
    throw new Error(
      `seedTripRoutes: Spot not found (did you run seedSpots first?): ${missingSpots.join(', ')}`,
    );
  }

  for (const r of tripRoutes) {
    const destinationId = destIdBySlug.get(r.destinationSlug)!;
    const routeTags = (r.tagSlugs ?? []).map((slug) => tagBySlug.get(slug)!);

    // A) Route: slug unique 기반 idempotent
    const existingRoute = await routeRepo.findOne({
      where: { slug: r.slug },
      relations: ['tags'],
    });
    const route = existingRoute ?? routeRepo.create();

    route.slug = r.slug;
    route.title = r.title;
    route.summary = r.summary;
    route.days = r.days;
    route.honyeoCost = r.honyeoCost;
    route.bookmarkCount = r.bookmarkCount ?? 0;
    route.destinationId = destinationId;
    route.tags = routeTags;

    const savedRoute = await routeRepo.save(route);

    // B) Day/Item: 삭제 후 재삽입(가장 예측 가능)
    //    - items -> days 순서로 삭제해야 FK 제약 안 걸림
    const existingDays = await dayRepo.find({
      where: { tripRouteId: savedRoute.id },
      select: ['id'],
    });

    if (existingDays.length > 0) {
      const dayIds = existingDays.map((d) => d.id);
      // itemRepo.delete에서 relation 조건 대신 dayId로 삭제 (가장 확실)
      await itemRepo.delete({ dayId: In(dayIds) });
      await dayRepo.delete({ tripRouteId: savedRoute.id });
    }

    // C) 새로 삽입
    for (const d of r.daysPlan) {
      // order 중복 방지 (dayId+order unique)
      const orders = d.items.map((i) => i.order);
      if (orders.length !== new Set(orders).size) {
        throw new Error(
          `seedTripRoutes: Duplicate order. route=${r.slug}, day=${d.dayNumber}`,
        );
      }

      const day = dayRepo.create({
        tripRouteId: savedRoute.id,
        dayNumber: d.dayNumber,
        title: d.title,
        note: d.note,
      });
      const savedDay = await dayRepo.save(day);

      const items = d.items.map((i) =>
        itemRepo.create({
          day: savedDay,

          order: i.order,
          recommendedLevel: i.recommendedLevel ?? 3,
          title: i.title,

          description: i.description,
          address: i.address,

          imageUrl: i.imageUrl,
          imageCredit: i.imageCredit,
          lat: i.lat,
          lng: i.lng,
          startTime: i.startTime,
          endTime: i.endTime,
          externalUrl: i.externalUrl,

          // spot 연결
          spotId: i.spotSlug ? spotIdBySlug.get(i.spotSlug)! : undefined,
        }),
      );

      await itemRepo.save(items);
    }
  }
}
