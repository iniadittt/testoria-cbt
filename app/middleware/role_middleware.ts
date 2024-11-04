import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  redirectTo = '/auth/login'

  async handle(ctx: HttpContext, next: NextFn, roles: string[]) {
    try {
      const user = await ctx.auth.authenticate()
      const role: string = user?.role
      const redirectMap: Record<string, string> = {
        admin: '/panel/admin',
        operator: '/management/operator',
        guru: '/management/guru',
        siswa: '/cbt',
      }
      const redirectTo: string = redirectMap[role] || '/cbt'
      if (!roles.includes(role)) {
        return ctx.response.redirect(redirectTo)
      }
      return next()
    } catch (error) {
      return ctx.response.redirect(this.redirectTo)
    }
  }
}
