import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class GuestMiddleware {
  /**
   * The URL to redirect to when user is logged-in
   */
  redirectTo = '/'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: { guards?: (keyof Authenticators)[] } = {}
  ) {
    for (let guard of options.guards || [ctx.auth.defaultGuard]) {
      if (await ctx.auth.use(guard).check()) {
        const user = await ctx.auth.authenticate()
        if (user) {
          const role: string = user?.role
          const redirectMap: Record<string, string> = {
            admin: '/panel/admin',
            operator: '/management/operator',
            guru: '/management/guru',
            siswa: '/cbt',
          }
          const redirectTo: string = redirectMap[role] || '/auth/login'
          return ctx.response.redirect(redirectTo)
        }
        return ctx.response.redirect(this.redirectTo, true)
      }
    }
    return next()
  }
}
