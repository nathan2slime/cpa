import type React from "react"
import { Badge } from "@/components/ui/badge"
import { useEventTags } from "@/hooks/api-hooks"
import type { EventFormResponse } from "@/types/event.types"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

type Props = {
  event: EventFormResponse
  children?: React.ReactNode
}

export const EventCard = ({ event, children }: Props) => {
  const { data: tags = [] } = useEventTags(event.id!)

  return (
    <>
      <div
        key={event.id}
        className={
          "flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl gap-3"
        }
      >
        <div className={"flex flex-col gap-2 sm:gap-3 justify-center w-full sm:w-auto"}>
          <div className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-3">
            <p className={"font-semibold text-sm sm:text-base break-words"}>{event.title}</p>
            <p className={"text-gray-500 text-xs sm:text-sm"}>
              {event.updatedAt &&
                formatDistanceToNow(event.updatedAt, {
                  addSuffix: true,
                  locale: ptBR,
                })}
            </p>
            <Badge
              variant={
                event.status === "em andamento" ? "default" : event.status === "agendado" ? "outline" : "destructive"
              }
              className="text-xs whitespace-nowrap"
            >
              {event.status}
            </Badge>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 w-full">
              {tags?.map((tag) => (
                <Badge className="w-fit text-xs" variant="secondary" key={tag.id}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {children && <div className={"flex gap-1 sm:gap-2 items-center mt-2 sm:mt-0 ml-auto"}>{children}</div>}
      </div>
    </>
  )
}
