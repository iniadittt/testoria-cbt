import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'
import type { HttpContext } from '@adonisjs/core/http'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx: HttpContext) => ctx.session.flashMessages.get('errors'),
    notification: (ctx: HttpContext) => ctx.session.flashMessages.get('notification'),
    authenticateUser: (ctx: HttpContext) => {
      const user = ctx.auth.user
      return {
        username: user?.username,
        fullName: user?.fullName,
        email: user?.email,
        role: user?.role,
        photo: user?.photo,
        phone: user?.phone,
      }
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
