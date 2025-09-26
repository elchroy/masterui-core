import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function NewButton ({url, variant = "default", label = "New"}: {url: string, variant?: "default" | "outline", label?: string}) {
  return (
    <Link to={url}>
      <Button variant={variant} size="sm" className="gap-2">
        <Plus className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
}