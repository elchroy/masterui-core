import { usePage } from "@kit/contexts/page-context";

export function AppFooter() {
  const { footerContent } = usePage();

  return (
    <footer className="bg-background sticky bottom-0 shrink-0 items-center gap-2 border-t bg-card px-4 z-20">
      <div className="flex-1">
        {footerContent}
      </div>
    </footer>
  )
}
