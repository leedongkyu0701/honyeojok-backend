import type { EntityManager } from 'typeorm';
import { In } from 'typeorm';

import { Destination } from '../../destinations/destination.entity';
import { Tag } from '../../tags/tag.entity';

import { destinations } from '../data/destinations';

export async function seedDestinations(m: EntityManager) {
  const destRepo = m.getRepository(Destination);
  const tagRepo = m.getRepository(Tag);

  // 1) upsert으로 Destination 기본 데이터 저장 (tagSlugs: db컬럼이 아닌 필드는 제외)
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

  // 누락 태그 검사
  const missing = allTagSlugs.filter((s) => !tagBySlug.has(s));
  if (missing.length > 0) {
    throw new Error(
      `seedDestinations: Missing tags (did you run seedTags first?): ${missing.join(
        ', ',
      )}`,
    );
  }

  const destSlugs = destinations.map((d) => d.slug);
  const destEntities = await destRepo.find({
    where: { slug: In(destSlugs) },
    relations: ['tags'],
  });

  const destBySlug = new Map(destEntities.map((d) => [d.slug, d]));

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
