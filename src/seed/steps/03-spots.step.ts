import type { EntityManager } from 'typeorm';
import { In } from 'typeorm';

import { Spot } from '../../spots/spot.entity';
import { Destination } from '../../destinations/destination.entity';
import { Tag } from '../../tags/tag.entity';

import { spots } from '../data/spots/index';
import { SpotCategory } from 'src/types/spot';

export async function seedSpots(m: EntityManager) {
  const spotRepo = m.getRepository(Spot);
  const destRepo = m.getRepository(Destination);
  const tagRepo = m.getRepository(Tag);

  // 1) Destination slug -> id (seed에 필요한 slug만)
  const regionSlugs = Array.from(new Set(spots.map((s) => s.regionSlug)));
  const dests = await destRepo.find({
    where: { slug: In(regionSlugs) },
    select: ['id', 'slug'],
  });

  const destIdBySlug = new Map(dests.map((d) => [d.slug, d.id]));
  const missingDest = regionSlugs.filter((slug) => !destIdBySlug.has(slug));
  if (missingDest.length) {
    throw new Error(
      `seedSpots: Destination not found: ${missingDest.join(', ')}`,
    );
  }

  // 2) Tag slug -> Tag 엔티티 (seed에서 쓰는 태그만)
  const allTagSlugs = Array.from(
    new Set(spots.flatMap((s) => s.tagSlugs ?? [])),
  );

  const tags =
    allTagSlugs.length === 0
      ? []
      : await tagRepo.find({
          where: { slug: In(allTagSlugs) },
          select: ['id', 'slug', 'label'],
        });

  const tagBySlug = new Map(tags.map((t) => [t.slug, t]));
  const missingTags = allTagSlugs.filter((slug) => !tagBySlug.has(slug));
  if (missingTags.length) {
    throw new Error(
      `seedSpots: Missing tags (did you run seedTags first?): ${missingTags.join(', ')}`,
    );
  }

  // 3) Spot upsert는 ManyToMany 때문에 애매해서, "slug unique 기반 findOne + save"가 가장 안전
  for (const s of spots) {
    const destinationId = destIdBySlug.get(s.regionSlug)!;

    const existing = await spotRepo.findOne({
      where: { slug: s.slug },
      relations: ['tags'],
    });

    const entity = existing ?? spotRepo.create();

    entity.name = s.name;
    entity.slug = s.slug;
    entity.summary = s.summary;
    entity.description = s.description;
    entity.isRecommended = s.isRecommended;

    entity.category = s.category ?? entity.category ?? SpotCategory.ETC;

    entity.honyeoTip = s.honyeoTip;
    entity.imageUrl = s.imageUrl;
    entity.imageSource = s.imageSource;
    entity.imageCredit = s.imageCredit;
    entity.address = s.address;
    entity.externalUrl = s.externalUrl;

    // FK
    entity.destinationId = destinationId;

    // ManyToMany
    entity.tags = (s.tagSlugs ?? []).map((slug) => tagBySlug.get(slug)!);

    await spotRepo.save(entity);
  }
}
