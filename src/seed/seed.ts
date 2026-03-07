import { AppDataSource } from '../data-source';
import { runSeed } from './seed-runner';
console.log('🚀 Starting seed...');

async function main() {
  const isProd = process.env.NODE_ENV === 'production';
  const allowProd = process.env.SEED_ALLOW_PROD === 'true';

  if (isProd && !allowProd) {
    throw new Error(
      'Cannot run seed in production environment unless SEED_ALLOW_PROD is set to true',
    );
  }

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
