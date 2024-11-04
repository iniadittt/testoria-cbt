'use client'
import React from 'react'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shadcn/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shadcn/sidebar'
import { usePage, Link } from '@inertiajs/react'
import { RoutesType } from '@/types/route'
import { motion, AnimatePresence } from 'framer-motion'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const routes: RoutesType = usePage().props.routes as RoutesType
  const activeItems = items.filter((item) => item.isActive).map((item) => item.title)
  const [openItem, setOpenItem] = React.useState<string[]>(activeItems)
  const handleCollapsible = (title: string) => {
    setOpenItem(
      // Versi bisa buka semua element
      // (prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title])

      // Hanya bisa buka 1 element
      (prev) => (prev.includes(title) ? [] : [title])
    )
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            open={openItem.includes(item.title)}
            onOpenChange={() => handleCollapsible(item.title)}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <motion.span
                    animate={{ rotate: openItem.includes(item.title) ? 90 : 0 }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                    className="ml-auto"
                  >
                    <ChevronRight className="size-4" />
                  </motion.span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <AnimatePresence initial={false}>
                {openItem.includes(item.title) && (
                  <CollapsibleContent asChild forceMount>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={routes.as[subItem.url]}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </motion.div>
                  </CollapsibleContent>
                )}
              </AnimatePresence>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
