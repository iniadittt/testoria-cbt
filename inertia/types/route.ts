export interface RouteType {
  pattern: string
  name: string
}

export interface RoutesType {
  current: string
  all: Route[]
  as: Record<string, string>
}
