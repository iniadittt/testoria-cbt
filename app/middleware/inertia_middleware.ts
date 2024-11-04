import router from '@adonisjs/core/services/router'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

interface RouteDataType {
  pattern: string
  name: string | undefined
}

export default class InertiaMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const routeData: RouteDataType[] = router.toJSON().root.map((route) => ({
      pattern: route.pattern,
      name: route.name,
    }))

    const routes: { current: string; all: RouteDataType[]; as: string[] } = {
      current: ctx.request.url(),
      all: routeData,
      as: routeData.reduce((accumulator: any, current: any) => {
        accumulator[current.name] = current.pattern
        return accumulator
      }, {}),
    }

    ctx.inertia.share({
      appName: env.get('APP_NAME') as string,
      routes,
    })

    /**
     * Call next method in the pipeline and return its output
     */
    return await next()
  }
}
