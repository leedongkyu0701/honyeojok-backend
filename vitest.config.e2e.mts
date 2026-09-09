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
    include: ['test/**/*.e2e-spec.ts'],
  },
});
