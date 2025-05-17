import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useCreateTag, useDeleteTag } from "@/hooks/api-hooks";
import toast from "react-hot-toast";
import { TagType } from "@/types/tag.type";
import { Badge } from "@/components/ui/badge";

type CreateTagFormType = {
  name: string;
};

type Props = {
  eventId?: string;
  formId?: string;
  tags: TagType[] | undefined;
};

export const TagPopover = ({ eventId, formId, tags }: Props) => {
  const form = useForm<CreateTagFormType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string().min(1),
      })
    ),
  });

  const createTag = useCreateTag();
  const deleteTag = useDeleteTag();

  const onSubmit = (data: CreateTagFormType) => {
    createTag.mutate(
      {
        name: data.name,
        event: eventId,
        form: formId,
      },
      {
        onSuccess: () => {
          toast.success("Tag criada com sucesso!");
          form.reset();
        },
      }
    );
  };

  const onDelete = (id: string) => {
    deleteTag.mutate(id, {
      onSuccess: () => {
        toast.success("Tag deletada com sucesso!");
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Tags</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Tags</h4>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da tag</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input placeholder="Avaliação" {...field} />
                          <Button type="submit">
                            <PlusIcon size={16} />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <div className="flex items-center gap-1" key={tag.id}>
                  <Badge className="w-fit relative" variant="secondary">
                    {tag.name}
                  </Badge>
                  <X
                    onClick={() => onDelete(tag.id!)}
                    size={16}
                    className="cursor-pointer bg-red-500 text-white rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
