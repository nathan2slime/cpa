import { Badge } from "@/components/ui/badge";
import { useEventTags } from "@/hooks/api-hooks";
import { EventFormResponse } from "@/types/event.types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  event: EventFormResponse;
  children?: React.ReactNode;
};

export const EventCard = ({ event, children }: Props) => {
  const { data: tags = [] } = useEventTags(event.id!);

  return (
    <>
      <div
        key={event.id}
        className={
          "flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl"
        }
      >
        <div className={"flex flex-col gap-3 justify-center"}>
          <div className="flex items-center gap-3">
            <p className={"font-semibold"}>{event.title}</p>
            <p className={"text-gray-500 text-sm"}>
              {event.updatedAt &&
                formatDistanceToNow(event.updatedAt, {
                  addSuffix: true,
                  locale: ptBR,
                })}
            </p>
            <Badge
              variant={
                event.status === "em andamento"
                  ? "default"
                  : event.status === "agendado"
                    ? "outline"
                    : "destructive"
              }
            >
              {event.status}
            </Badge>
          </div>

          {tags.length > 0 && (
            <div className="flex gap-2 w-full">
              {tags?.map((tag) => (
                <Badge className="w-fit" variant="secondary" key={tag.id}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {children && (
          <div className={"flex gap-2 items-center"}>{children}</div>
        )}
      </div>
    </>
  );
};
