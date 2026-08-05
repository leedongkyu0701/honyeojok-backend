import type { EntityManager } from 'typeorm';
import { tags } from '../data/tags';
import { Tag } from 'src/modules/tags/entities/tag.entity';

export async function seedTags(m: EntityManager) {
  const repo = m.getRepository(Tag);
  await repo.upsert([...tags], ['slug']);
}
