import { AppSidebar, type SidebarMenuGroups } from "@kit/components/app-sidebar"
import { SiteHeader } from "@kit/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@kit/components/ui/sidebar"
import { usePage } from "@kit/contexts/page-context"
import { useAuth } from "@kit/hooks/use-auth"
import { Outlet, useNavigate } from "react-router-dom"
import { Toaster } from "sonner"
import { AppFooter } from "./app-footer"
import { NotAuthenticated } from "./empty-states"
import ErrorLayout from "./error-layout"
import { PageLoading } from "./loading-states"

export default function BaseLayout({
  menuItemsGroup,
  loginPage,
}: {
  menuItemsGroup: SidebarMenuGroups,
  loginPage: string,
}) {
  const { authUser, loading } = useAuth();
  const navigate = useNavigate();
  const { pageSidebarItems } = usePage();
  if (loading) {
    return <ErrorLayout>
      <PageLoading />
    </ErrorLayout>;
  }
  
  if (!authUser) {
    return <ErrorLayout>
      <NotAuthenticated action={{
        label: "Go to Login",
        onClick: () => {
          navigate(loginPage);
        },
      }} />
    </ErrorLayout>;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        menuItemsGroup={menuItemsGroup}
        pageSideNavItems={pageSidebarItems}
        loginPage={loginPage}
        variant="inset"
      />
      <SidebarInset className="m-0">
        <SiteHeader />
        <div className="flex flex-1 flex-col md:pl-[--sidebar-width] pt-[--header-height]">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="space-y-6 container mx-auto">
                <Outlet />
              </div>
            </div>
            <Toaster richColors={true} position="top-right" />
          </div>
        </div>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
