import type { EntityManager } from 'typeorm';
import { In } from 'typeorm';

import { tripRoutes } from '../data/trip-routes/index';

import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { TripRouteDay } from 'src/modules/trip-routes/entities/trip-route-day.entity';
import { TripRouteItem } from 'src/modules/trip-routes/entities/trip-route-item.entity';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';

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
          select: [
            'id',
            'slug',
            'summary',
            'address',
            'imageUrl',
            'imageCredit',
            'lat',
            'lng',
            'externalUrl',
          ],
        });
  const spotBySlug = new Map(spots.map((s) => [s.slug, s]));
  const missingSpots = allSpotSlugs.filter((s) => !spotBySlug.has(s));
  if (missingSpots.length) {
    throw new Error(
      `seedTripRoutes: Spot not found (did you run seedSpots first?): ${missingSpots.join(', ')}`,
    );
  }

  for (const r of tripRoutes) {
    const destinationId = destIdBySlug.get(r.destinationSlug)!;
    const routeTags = (r.tagSlugs ?? []).map((slug) => tagBySlug.get(slug)!);

    // 1) Route: slug unique 기반 idempotent
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
    route.honyeoTip = r.honyeoTip;
    route.bookmarkCount = route.bookmarkCount ?? r.bookmarkCount ?? 0; // 기존 bookmarkCount 유지 (seed에 없는 경우 0으로 초기화)
    route.destinationId = destinationId;
    route.tags = routeTags;

    const savedRoute = await routeRepo.save(route);

    // 2) Day/Item: 삭제 후 재삽입(가장 예측 가능)
    //    - items -> days 순서로 삭제해야 FK 제약 안 걸림
    const existingDays = await dayRepo.find({
      where: { tripRouteId: savedRoute.id },
      select: ['id'],
    });

    if (existingDays.length > 0) {
      const dayIds = existingDays.map((d) => d.id);
      // itemRepo.delete에서 relation 조건 대신 dayId로 삭제
      await itemRepo.delete({ dayId: In(dayIds) });
      await dayRepo.delete({ tripRouteId: savedRoute.id });
    }

    // 3) 새로 삽입
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

      const items = d.items.map((i) => {
        const spot = i.spotSlug ? spotBySlug.get(i.spotSlug) : undefined;

        // ✅ spotSlug가 있으면 spot에서 필드를 가져오고,
        //    seed에 직접 description이 있는 경우(예: 혼밥/혼술 커스텀)는 seed 값을 우선 사용
        const description = i.description ?? spot?.summary ?? '';
        const address = i.address ?? spot?.address;
        const imageUrl = i.imageUrl ?? spot?.imageUrl;
        const imageCredit = i.imageCredit ?? spot?.imageCredit;
        const lat = i.lat ?? spot?.lat;
        const lng = i.lng ?? spot?.lng;
        const externalUrl = i.externalUrl ?? spot?.externalUrl;

        return itemRepo.create({
          day: savedDay,

          order: i.order,
          recommendedLevel: i.recommendedLevel ?? 3,
          title: i.title,

          description,
          address,

          imageUrl,
          imageCredit,
          lat,
          lng,
          startTime: i.startTime,
          endTime: i.endTime,
          externalUrl,
          spotId: spot ? spot.id : undefined,
        });
      });

      await itemRepo.save(items);
    }
  }
}
