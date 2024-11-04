import * as React from 'react'
import { usePage, Link } from '@inertiajs/react'
import { AdminDataSidebar } from '@/app/admin_data_sidebar'
import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/components/nav-user'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shadcn/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shadcn/sidebar'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/shadcn/breadcrumb'
import { Separator } from '@/shadcn/separator'
import { RoutesType } from '@/types/route'

export function AdminLayout({ title, children, ...props }: React.ComponentProps<typeof Sidebar>) {
  const appName: string = usePage().props.appName as string
  const routes: RoutesType = usePage().props.routes as RoutesType
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="bg-white">
          <Link href={routes.as['admin.page']}>
            <img
              src="/assets/image/panel/logo.png"
              alt={appName || 'Default Name'}
              className="w-4/5 mx-auto cursor-pointer mt-4"
            />
          </Link>
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <NavMain items={AdminDataSidebar.navMain} />
          <NavProjects projects={AdminDataSidebar.projects} />
        </SidebarContent>
        <SidebarFooter className="bg-white">
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={routes.as['admin.page']}>Platform</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="w-full p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
