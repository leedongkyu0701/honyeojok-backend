import type { DataSource } from 'typeorm';
import { seedDestinations } from './steps/01-destinations.step';
import { seedTags } from './steps/02-tags.step';
import { seedSpots } from './steps/03-spots.step';
import { seedTripRoutes } from './steps/04-trip-routes.step';

export async function runSeed(dataSource: DataSource) {
  await dataSource.transaction(async (manager) => {
    await seedDestinations(manager);
    await seedTags(manager);
    await seedSpots(manager);
    await seedTripRoutes(manager);
  });
}
