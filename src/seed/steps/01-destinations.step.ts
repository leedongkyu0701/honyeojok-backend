// src/seed/steps/01-destinations.step.ts
import type { EntityManager } from 'typeorm';
import { destinations } from '../data/destinations';

// ✅ 네 엔티티 경로에 맞게 수정
import { Destination } from '../../destinations/destination.entity';

export async function seedDestinations(m: EntityManager) {
  const repo = m.getRepository(Destination);

  // slug unique 기준 upsert (실무에서 가장 안전)
  await repo.upsert([...destinations], ['slug']);

  // rank unique도 있다면, 데이터가 깨지면 여기서 운영에서 바로 실패하는 게 정상임
}
