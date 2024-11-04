import type { HttpContext } from '@adonisjs/core/http'

export default class GuestsController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render('home')
  }
}
