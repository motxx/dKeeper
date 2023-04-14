import StringPlugin from "vite-plugin-string";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [
      // @ts-ignore
      StringPlugin({
        include: /\.lit\.js$/,
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
