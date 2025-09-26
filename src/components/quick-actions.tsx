// StatsGrid.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kit/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export interface QuickAction {
  title: string;
  description?: string;
  icon: LucideIcon;
  isActive: boolean;
  link: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  actionsTitle: string;
  actionsDescription?: string;
}

export function QuickActions({ actions, actionsTitle, actionsDescription }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{actionsTitle}</CardTitle>
        <CardDescription>
          {actionsDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions
            .map((action, idx) => {
              return (
                <Button key={idx} asChild variant="outline" className="h-auto p-4 justify-start">
                  <Link to={action.link}>
                    <div className="flex items-center gap-3">
                      <action.icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        {action.description && (
                          <div className="text-sm text-muted-foreground">
                            {action.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </Button>
              )
            })
          }
      </CardContent>
    </Card>
  );
}