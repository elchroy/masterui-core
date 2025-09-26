import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function ViewButton ({url, label = "Details"}: {url: string, label?: string}) {
  return (
    <Link to={url}>
      <Button size="sm" className="gap-2">
        <Eye className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
}