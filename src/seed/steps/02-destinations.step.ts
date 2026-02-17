import type { EntityManager } from 'typeorm';
import { In } from 'typeorm';

import { Destination } from '../../destinations/destination.entity';
import { Tag } from '../../tags/tag.entity';

import { destinations } from '../data/destinations';

export async function seedDestinations(m: EntityManager) {
  const destRepo = m.getRepository(Destination);
  const tagRepo = m.getRepository(Tag);

  // 1) Destination upsert (tagSlugs는 컬럼이 아니므로 제거)
  const upsertRows = destinations.map((d) => {
    const row = { ...d };
    delete row.tagSlugs;
    return row;
  });

  await destRepo.upsert(upsertRows, ['slug']);

  // 2) tagSlugs가 있으면 destination_tags 연결
  const allTagSlugs = Array.from(
    new Set(destinations.flatMap((d) => d.tagSlugs ?? [])),
  );

  if (allTagSlugs.length === 0) return;

  const tags = await tagRepo.find({ where: { slug: In(allTagSlugs) } });
  const tagBySlug = new Map(tags.map((t) => [t.slug, t]));

  // 누락 태그 검사(오타/seed 순서 문제를 빨리 잡기 위해 추천)
  const missing = allTagSlugs.filter((s) => !tagBySlug.has(s));
  if (missing.length > 0) {
    throw new Error(
      `seedDestinations: Missing tags (did you run seedTags first?): ${missing.join(
        ', ',
      )}`,
    );
  }

  // Destination 엔티티들을 한 번에 가져와서 Map 구성
  const destSlugs = destinations.map((d) => d.slug);

  const destEntities = await destRepo.find({
    where: { slug: In(destSlugs) },
    relations: ['tags'],
  });

  const destBySlug = new Map(destEntities.map((d) => [d.slug, d]));
  // 효율을 위한 Map 생성

  // 3) tags 세팅 + save (조인 테이블 업데이트)
  for (const d of destinations) {
    if (!d.tagSlugs?.length) continue;

    const dest = destBySlug.get(d.slug);
    if (!dest) {
      throw new Error(`seedDestinations: Destination not found: ${d.slug}`);
    }

    dest.tags = d.tagSlugs.map((s) => tagBySlug.get(s)!);
  }

  await destRepo.save(destEntities);
}
