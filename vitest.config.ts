/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.{js,ts,mjs,mts}', 'tests/**/*.test.{js,ts,mjs,mts}'],
  },
});
