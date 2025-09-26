import { Separator } from "@kit/components/ui/separator";
import { SidebarTrigger } from "@kit/components/ui/sidebar";
import { usePage } from "@kit/contexts/page-context";
// import type { BreadcrumbEntry } from "@kit/pages/types";
import type { BreadcrumbEntry } from "@kit/shared/domain";
import ThemeSwitcher from "./theme-switcher";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";

export function SiteHeader() {
  const { breadcrumbs } = usePage();

  return (
    <header className="sticky top-0 bg-background z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex w-full items-center justify-between gap-4">
          {/* Left Column - Breadcrumbs and Page Title */}
          <div className="flex items-center justify-content gap-4 w-full">
            <Breadcrumb>
              <BreadcrumbList>
              {breadcrumbs.map((crumb: BreadcrumbEntry, idx: number) => {
                return <div key={crumb.key} className="flex items-center gap-2">
                  <BreadcrumbItem key={crumb.label} className="hidden md:block">
                      {crumb.href ? (
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                  </BreadcrumbItem>
                  {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </div>
              })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher className="sm:w-auto" />
          </div>
        </div>
      </div>
    </header>
  )
}
