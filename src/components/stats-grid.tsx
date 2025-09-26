// StatsGrid.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@kit/components/ui/card";
import type { LucideIcon } from "lucide-react";

export interface Stat {
  label: string;
  icon?: LucideIcon;
  value: string | number;
  description?: string;
}

interface StatsGridProps {
  stats: Stat[];
  variant?: "simple" | "cards"; // choose layout style
}

export function StatsGrid({ stats, variant = "simple" }: StatsGridProps) {
  if (variant === "cards") {
    return (
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  {stat.icon && <stat.icon className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  {stat.description && (
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Simple numbers-only style
  return (
    <section className="py-12 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // return (
  //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
  //     {stats.map((stat, idx) => (
  //       <Card key={idx}>
  //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  //           <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
  //           <stat.icon className="h-4 w-4 text-muted-foreground" />
  //         </CardHeader>
  //         <CardContent>
  //           <div className="text-2xl font-bold">{stat.value}</div>
  //           {stat.description && (
  //             <p className="text-xs text-muted-foreground">{stat.description}</p>
  //           )}
  //         </CardContent>
  //       </Card>
  //     ))}
  //   </div>
  // );
}

export interface IndustryStat {
  industry: string;
  percentage: string;
  description: string;
}

export function IndustryStatsSection({ stats, heading, subheading }: { stats: IndustryStat[], heading: string, subheading: string }) {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{heading}</h2>
          <p className="text-xl text-muted-foreground">{subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.percentage}</div>
                <div className="font-semibold mb-1">{stat.industry}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeedbackStatsSection({ stats }: { stats: Stat[], heading?: string, subheading?: string }) {
  return (
    <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {stat.icon && <stat.icon className="h-8 w-8 text-primary" />}
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
