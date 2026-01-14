import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

interface MessageCardProps {
  message: string
  date: Date
}

export function MessageCard({ message, date }: MessageCardProps) {
  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardContent className="pt-4">
        <p className="text-foreground text-base leading-relaxed mb-3">{message}</p>
        <p className="text-muted-foreground text-sm">{format(date, "MMM d, yyyy · h:mm a")}</p>
      </CardContent>
    </Card>
  )
}
