import { defineConfig } from 'orval';

export default defineConfig({
  web: {
    input: './packages/contracts/openapi.json',
    output: {
      target: './apps/web/src/api/generated/index.ts',
      client: 'fetch',
      mode: 'single',
      clean: true,
      prettier: true,
    },
  },
  admin: {
    input: './packages/contracts/openapi.json',
    output: {
      target: './apps/admin/src/api/generated/index.ts',
      client: 'fetch',
      mode: 'single',
      clean: true,
      prettier: true,
    },
  },
});
