import type { EntityManager } from 'typeorm';
import { tags } from '../data/tags';
import { Tag } from '../../tags/tag.entity';

export async function seedTags(m: EntityManager) {
  const repo = m.getRepository(Tag);
  await repo.upsert([...tags], ['slug']);
}
