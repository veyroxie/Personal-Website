// Standalone config: the tests exercise plain data modules, so they skip the
// SvelteKit plugin in vite.config.ts entirely.
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['src/**/*.test.ts']
	}
});
