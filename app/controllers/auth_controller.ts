import type { HttpContext } from '@adonisjs/core/http'
import { RedirectTo, FlashAndRedirect } from '#services/general_service'
import { LoginValidator } from '#validators/login'
import { RedirectMap } from '#constant/location_page'
import { RoleType } from '#types/role'
import User from '#models/user'

export default class AuthController {
  async login(ctx: HttpContext) {
    return ctx.inertia.render('auth/login')
  }

  async login_store(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(LoginValidator)
    try {
      const user = await User.findBy('username', payload.username)
      if (!user || !(await User.verifyCredentials(payload.username, payload.password))) {
        return FlashAndRedirect(ctx, 'error', 'Username atau password salah')
      }

      const isUserInvalid: boolean = !user.isActive || user.isDelete
      if (isUserInvalid) {
        return FlashAndRedirect(ctx, 'error', 'Username atau password salah')
      }
      await ctx.auth.use('web').login(user)
      const role: RoleType = user.role
      const to: string = RedirectMap[role] || 'cbt.page'
      return FlashAndRedirect(ctx, 'success', 'Login berhasil', to)
    } catch (error) {
      return FlashAndRedirect(ctx, 'error', error.message)
    }
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    return RedirectTo(ctx, 'auth.login.page')
  }
}
