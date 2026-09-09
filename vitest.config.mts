import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  oxc: {
    decorator: {
      legacy: true,
      emitDecoratorMetadata: true,
    },
    assumptions: {
      setPublicClassFields: true,
    },
    typescript: {
      removeClassFieldsWithoutInitializer: true,
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    exclude: ['test/**/*.e2e-spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,js}'],
      reportsDirectory: './coverage',
    },
  },
});
