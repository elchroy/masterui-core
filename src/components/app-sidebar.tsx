
import { NavDocuments } from "@kit/components/nav-documents"
import { NavMain } from "@kit/components/nav-main"
import { NavSecondary } from "@kit/components/nav-secondary"
import { NavUser } from "@kit/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@kit/components/ui/sidebar"
import { SideNavItem } from "@kit/shared/domain"
import type { ComponentProps } from "react"

export interface SidebarMenuGroups {
  topMenuItems: SideNavItem[];
  middleMenuItems: SideNavItem[];
  bottomMenuItems: SideNavItem[];
}

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  loginPage: string;
  menuItemsGroup: SidebarMenuGroups;
  pageSideNavItems?: SideNavItem[];
}

export function AppSidebar({
  menuItemsGroup,
  loginPage,
  pageSideNavItems,
  ...props
}: AppSidebarProps) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                {/* <span className="text-base font-semibold">Acme Inc.</span> */}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItemsGroup.topMenuItems} />
        {/* {pageSideNavItems && (
          <NavMain items={pageSideNavItems} />
        )} */}
          <NavDocuments items={menuItemsGroup.middleMenuItems} />
        <NavSecondary items={menuItemsGroup.bottomMenuItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser loginPage={loginPage} />
      </SidebarFooter>
    </Sidebar>
  )
}
