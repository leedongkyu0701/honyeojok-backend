// src/seed/steps/02-tags.step.ts
import type { EntityManager } from 'typeorm';
import { tags } from '../data/tags';

// ✅ 네 엔티티 경로에 맞게 수정
import { Tag } from '../../tags/tag.entity';

export async function seedTags(m: EntityManager) {
  const repo = m.getRepository(Tag);
  await repo.upsert([...tags], ['slug']);
}
