import { Button } from "@kit/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kit/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export interface ErrorStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionLink?: string;
  showBackButton?: boolean;
}

export function ErrorState({
  title,
  description,
  icon: Icon = AlertTriangle,
  actionLabel = "Go back home",
  actionLink = "/",
  showBackButton = true,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 md:p-6 lg:p-8">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 rounded-full bg-muted p-3 w-fit">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {showBackButton && (
            <Button variant="default" asChild>
              <Link to={actionLink}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {actionLabel}
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
