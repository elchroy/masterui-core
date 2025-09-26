
import { Badge } from "@kit/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@kit/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { createElement } from "react"

export interface SectionCard {
  title: string
  description: string
  value: string
  badge?: {
    icon: LucideIcon
    text: string
    variant?: "outline" | "default"
  }
  footer?: {
    text: string
    subtext?: string
    icon: LucideIcon
  }
}

export interface SectionCardsProps {
  sectionCards: SectionCard[]
}

export function SectionCards({ sectionCards }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {sectionCards.map((card, index) => (
        <Card className="@container/card" key={index}>
        <CardHeader>
          <CardDescription>{card.title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {card.value}
          </CardTitle>
          {card.badge && (<CardAction>
            <Badge variant="outline">
              {createElement(card.badge.icon, { size: 16 })}
              {card.badge.text}
            </Badge>
          </CardAction>)}
        </CardHeader>
        {card.footer && (<CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {card.footer.text}
            {card.footer.icon && (
              <span className="size-4">{createElement(card.footer.icon, { size: 16 })}</span>
            )}
          </div>
          {card.footer.subtext && (
            <div className="text-muted-foreground">
              {card.footer.subtext}
            </div>
          )}
        </CardFooter>)}
      </Card>
      ))}
    </div>
  )
}
