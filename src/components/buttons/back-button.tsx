import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function BackButton ({url}: {url: string}) {
  return (
    <Link to={url}>
      <Button size="sm" variant="ghost" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </Link>
  );
}