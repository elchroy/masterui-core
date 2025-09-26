
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@kit/components/ui/sidebar"
import { cn } from "@core/lib/utils"
import type { NavItem, SideNavItem } from "@kit/shared/domain"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

export function NavMain({
  items,
}: {
  items: SideNavItem[]
}) {
  const location = useLocation()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  // Auto-open parent menu when on a sub-page
  useEffect(() => {
    const newOpenItems = new Set<string>()
    
    items.forEach(item => {
      if (item.items && item.items.length > 0) {
        const hasActiveSubItem = item.items.some((subItem: NavItem) => 
          location.pathname === subItem.url || 
          (subItem.url !== "/" && location.pathname.startsWith(subItem.url + "/"))
        )
        const isMainItemActive = location.pathname === item.url
        
        if (hasActiveSubItem || isMainItemActive) {
          newOpenItems.add(item.key)
        }
      }
    })
    
    setOpenItems(newOpenItems)
  }, [location.pathname, items])

  const isItemActive = (url: string) => {
    if (url === "/" || url === "/app") {
      return location.pathname === url
    }
    return location.pathname === url || location.pathname.startsWith(url + "/")
  }

  const hasActiveSubItem = (item: SideNavItem) => {
    if (!item.items) return false
    return item.items.some((subItem: NavItem) => isItemActive(subItem.url))
  }

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0
          const isMainActive = isItemActive(item.url)
          const hasActiveSub = hasActiveSubItem(item)
          const shouldBeOpen = openItems.has(item.key)

          if (!hasSubItems) {
            // Simple menu item without sub-items
            return (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  className={cn(isMainActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          // Menu item with sub-items (collapsible)
          return (
            <Collapsible
              key={item.key}
              asChild
              open={shouldBeOpen}
              onOpenChange={(open) => {
                setOpenItems(prev => {
                  const newSet = new Set(prev)
                  if (open) {
                    newSet.add(item.key)
                  } else {
                    newSet.delete(item.key)
                  }
                  return newSet
                })
              }}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    className={cn(
                      "w-full",
                      (isMainActive || hasActiveSub) && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem: NavItem) => (
                      <SidebarMenuSubItem key={subItem.key}>
                        <SidebarMenuSubButton 
                          asChild
                          className={cn(
                            isItemActive(subItem.url) && "bg-sidebar-accent text-sidebar-accent-foreground"
                          )}
                        >
                          <Link to={subItem.url}>
                            {subItem.icon && <subItem.icon className="h-4 w-4" />}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
