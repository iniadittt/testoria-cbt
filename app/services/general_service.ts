import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Notification from '#models/notification'
import Activity from '#models/activity'

export const RedirectTo = (ctx: HttpContext, route?: string, params?: any) => {
  return route ? ctx.response.redirect().toRoute(route, params) : ctx.response.redirect().back()
}

export const FlashAndRedirect = (
  ctx: HttpContext,
  type: string,
  message: string,
  route: string = '',
  params: object = {}
) => {
  ctx.session.flash({ notification: { type, message } })
  if (route) return RedirectTo(ctx, route, params)
  return RedirectTo(ctx)
}

export const CreateNotification = async (
  userId: number,
  title: string,
  message: string,
  type: 'info' | 'warning' | 'error'
) => {
  const user = await User.find(userId)
  if (!user) throw new Error(`Pengguna dengan id ${userId} tidak ada`)
  await Notification.create({
    userId,
    title,
    message,
    type,
    status: 'unread',
  })
  return { error: false, message: 'Berhasil membuat notifikasi' }
}

export const CreateActivity = async (userId: number, title: string) => {
  const user = await User.find(userId)
  if (!user) throw new Error(`Pengguna dengan id ${userId} tidak ada`)
  await Activity.create({
    userId,
    title: `${user.fullName}, ${title}`,
  })
  return { error: false, message: 'Berhasil mencatat aktifitas' }
}
