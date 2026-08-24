import { AppDataSource } from 'src/data-source';
import { getEnvironment } from 'src/config/environment';
import { runSeed } from './seed-runner';

async function main() {
  const environment = getEnvironment();

  if (environment.APP_ENV !== 'local') {
    throw new Error('Development seed can only run with APP_ENV=local');
  }

  console.log('🚀 Starting seed...');
  await AppDataSource.initialize();
  try {
    await runSeed(AppDataSource);
    console.log('✅ Seed done');
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((e) => {
  console.error('❌ Seed failed', e);
  process.exit(1);
});
