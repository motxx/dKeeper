import { nodePolyfills } from 'vite-plugin-node-polyfills'
import StringPlugin from "vite-plugin-string";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  vite: {
    plugins: [
      // @ts-ignore
      StringPlugin({
        include: /\.lit\.js$/,
      }),
      nodePolyfills({
        protocolImports: true,
      }),
    ],
  },
  buildModules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
