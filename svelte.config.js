import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  // Keep compatibility with Svelte 4 component API (uses `new App(...)`)
  compilerOptions: {
    compatibility: {
      componentApi: 4
    }
  }
}
