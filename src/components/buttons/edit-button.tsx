import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function EditButton ({url, title = "Edit"}: {url: string, title?: string}) {
  return (
    <Link to={url}>
      <Button size="sm" className="gap-2">
        <Edit className="h-4 w-4" />
        {title}
      </Button>
    </Link>
  );
}