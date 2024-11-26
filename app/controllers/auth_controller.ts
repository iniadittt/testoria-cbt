import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { FlashAndRedirect } from '#services/general_service'
import { LoginValidator } from '#validators/login'
import { RedirectMap } from '#constant/location_page'
import { RoleType } from '#types/role'
import { cuid } from '@adonisjs/core/helpers'
import User from '#models/user'
import Asset from '#models/asset'

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
      await ctx.auth.use('web').login(user)
      const role: RoleType = user.role
      const to: string = RedirectMap[role] || 'cbt.page'
      return FlashAndRedirect(ctx, 'success', 'Berhasil Masuk', to)
    } catch (error) {
      return FlashAndRedirect(ctx, 'error', error.message)
    }
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    return FlashAndRedirect(ctx, 'success', 'Berhasil Keluar', 'auth.login.page')
  }

  async upload(ctx: HttpContext) {
    try {
      const file = ctx.request.file('file', {
        size: '10mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
      if (!file?.isValid) {
        return ctx.response.json({
          code: 400,
          message: 'Bad request',
        })
      }
      const folderName: string = 'assets/uploads'
      const name: string = `${cuid()}.${file.extname}`
      await file.move(app.makePath(`public/${folderName}`), { name })
      const url: string = `${folderName}/${name}`
      const createAsset = await Asset.create({ url })
      return ctx.response.json({
        code: 200,
        message: 'Berhasil mengupload file ke server',
        data: { assetId: createAsset.id, url },
      })
    } catch (error) {
      return ctx.response.json({
        code: 500,
        message: error || 'Internal server error',
      })
    }
  }
}
