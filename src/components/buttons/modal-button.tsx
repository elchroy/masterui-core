import { LucideIcon } from "lucide-react";
import { createElement } from "react";
import { Button } from "../ui/button";

export function ModalButton ({ onClick, icon, variant = "default", label = "New"}: {onClick: () => void, variant?: "default" | "outline", label?: string, icon: LucideIcon}) {
  return (
    <Button onClick={onClick} variant={variant} size="sm" className="gap-2">
      {createElement(icon, {className: "h-4 w-4"})}
      {label}
    </Button>
  );
}