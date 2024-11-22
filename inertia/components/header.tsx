import { Link, usePage } from '@inertiajs/react'
import { ArrowLeft, RotateCw } from 'lucide-react'
import { RoutesType } from '@/types/route'

export function Header({
  title,
  back,
  href,
  refresh = false,
  refreshUrl,
  children,
}: {
  title: string
  back: boolean
  href?: string
  refresh?: boolean
  refreshUrl?: string
  children: React.ReactNode
}) {
  const routes = usePage().props.routes as RoutesType
  return (
    <div className="w-full border-b flex flex-col md:flex-row items-start md:items-center py-1 pl-6">
      <div className="flex">
        {back && href && (
          <Link href={`${routes.as[href]}`}>
            <ArrowLeft
              style={{ strokeWidth: '2' }}
              className="w-8 h-8 hover:bg-gray-100 rounded-full cursor-pointer p-1.5 text-blue-600"
            />
          </Link>
        )}
        <h1
          className={`${back && href ? 'ml-4' : 'ml-0'} text-left text-[16px] md:text-18px font-normal mr-16 leading-36 text-nowrap"`}
        >
          {title}
        </h1>
      </div>
      <div className="flex flex-wrap">
        {children}
        {refresh && (
          <Link
            href={refreshUrl || routes.current}
            style={{ fontWeight: '600' }}
            className="uppercase flex items-center gap-1 px-3 hover:bg-gray-100 rounded text-blue-600 leading-36"
          >
            <RotateCw className="w-4" />
            <span className="text-13px font-semibold">Refresh</span>
          </Link>
        )}
      </div>
    </div>
  )
}
