import { AppDataSource } from 'src/data-source';
import { runSeed } from './seed-runner';
import { assertDeploySeedEnvironment } from './seed-environment';

async function main() {
  assertDeploySeedEnvironment(process.env.APP_ENV);

  console.log('🚀 Starting seed...');
  await AppDataSource.initialize();
  try {
    await runSeed(AppDataSource);
    console.log('✅ Seed done');
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((error) => {
  console.error('❌ Seed failed', error);
  process.exit(1);
});
