'use client'

import { ChevronsUpDown, KeyRound, LogOut, UserCog } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shadcn/sidebar'
import { AuthenticateUserType } from '@/types/authenticateUser'

export function NavUser() {
  const authenticateUser: AuthenticateUserType = usePage().props
    .authenticateUser as AuthenticateUserType
  const { isMobile } = useSidebar()
  const initialUser = authenticateUser.fullName.split(' ').map((text) => text[0])
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={authenticateUser.photo || '/assets/image/panel/noimage.jpg'}
                  alt={authenticateUser.fullName || '-'}
                />
                <AvatarFallback className="rounded-lg">{initialUser}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{authenticateUser.fullName || '-'}</span>
                <span className="truncate text-xs">{authenticateUser.email || '-'}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={authenticateUser.photo || '/assets/image/panel/noimage.jpg'}
                    alt={authenticateUser.fullName || '-'}
                  />
                  <AvatarFallback className="rounded-lg">{initialUser}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{authenticateUser.fullName || '-'}</span>
                  <span className="truncate text-xs">{authenticateUser.email || '-'}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <UserCog />
                Akun Saya
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <KeyRound />
                Ubah Password
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
