// src/seed/steps/03-spots.step.ts
import type { EntityManager } from 'typeorm';
import { spots } from '../data/spots';

// ✅ 네 엔티티 경로에 맞게 수정
import { Spot } from '../../spots/spot.entity';
import { Destination } from '../../destinations/destination.entity';
import { Tag } from '../../tags/tag.entity';

export async function seedSpots(m: EntityManager) {
  const spotRepo = m.getRepository(Spot);
  const destRepo = m.getRepository(Destination);
  const tagRepo = m.getRepository(Tag);

  const dests = await destRepo.find({ select: ['id', 'slug'] });
  const destBySlug = new Map(dests.map((d) => [d.slug, d.id]));

  const allTags = await tagRepo.find({ select: ['id', 'slug', 'label'] });
  const tagBySlug = new Map(allTags.map((t) => [t.slug, t]));

  for (const s of spots) {
    const destinationId = destBySlug.get(s.regionSlug);
    if (!destinationId)
      throw new Error(`Destination not found: ${s.regionSlug}`);

    const tagEntities = (s.tagSlugs ?? [])
      .map((slug) => tagBySlug.get(slug))
      .filter(Boolean) as Tag[];

    // slug unique 기반으로 idempotent하게 갱신
    const existingSpot = await spotRepo.findOne({
      where: { slug: s.slug },
      relations: ['tags'],
    });

    const entity = existingSpot ?? spotRepo.create();

    entity.name = s.name;
    entity.slug = s.slug;
    entity.note = s.note;
    entity.description = s.description;
    entity.isRecommended = s.isRecommended;
    entity.imageUrl = s.imageUrl;
    entity.imageSource = s.imageSource ?? null;
    entity.imageCredit = s.imageCredit ?? null;
    entity.address = s.address ?? null;
    entity.externalUrl = s.externalUrl ?? null;
    entity.destinationId = destinationId;
    entity.tags = tagEntities;

    await spotRepo.save(entity);
  }
}
