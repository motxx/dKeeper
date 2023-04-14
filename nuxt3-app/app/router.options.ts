import type { RouterOptions } from '@nuxt/schema'
import { RouterOptions as VueRouterOptions } from "vue-router";

export default <RouterOptions> {
  routes(_routes: VueRouterOptions['routes']) {
    return [..._routes,
      {
        path: '/',
        component: () => import('~/components/issuer.vue')
      },
      {
        path: '/issuer',
        component: () => import('~/components/issuer.vue')
      },
      {
        path: '/holder',
        component: () => import('~/components/holder.vue')
      },
      {
        path: '/verifier',
        component: () => import('~/components/verifier.vue')
      },
    ];
  }
}