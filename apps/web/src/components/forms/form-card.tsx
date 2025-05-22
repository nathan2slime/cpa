import { TagPopover } from "@/components/tag-popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteForm, useFormTags } from "@/hooks/api-hooks";
import { FormReq } from "@/types/form";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

type Props = {
  form: FormReq,
  children?: React.ReactNode;
};
export const FormCard = ({ form, children }: Props) => {
  const { mutate: deleteForm } = useDeleteForm();
  const { data: tags = [] } = useFormTags(form.id!);
  const router = useRouter();

  return (
    <div
      key={form.id}
      className={
        "flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl"
      }
    >
      <div className={"flex flex-col gap-3 justify-center w-full"}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <p className={"font-semibold break-words"}>{form.title}</p>
          <p className={"text-gray-500 text-xs sm:text-sm"}>
            {form.updatedAt &&
              formatDistanceToNow(form.updatedAt, {
                addSuffix: true,
                locale: ptBR,
              })}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full">
            {tags?.map((tag) => (
              <Badge className="w-fit text-xs" variant="secondary" key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {children && <div className={"flex gap-2 items-center mt-3 sm:mt-0"}>{children}</div>}
    </div>
  )
};
