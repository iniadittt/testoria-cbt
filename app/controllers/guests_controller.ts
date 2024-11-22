import type { HttpContext } from '@adonisjs/core/http'
import Team from '#constant/team'

export default class GuestsController {
  async index(ctx: HttpContext) {
    return ctx.inertia.render('home', { team: Team })
  }
}
