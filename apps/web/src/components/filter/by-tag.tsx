import { Button } from "@/components/ui/button";
import { TagType } from "@/types/tag.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  tags: TagType[];
};

export const FilterTag = ({ tags }: Props) => {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");
  const router = useRouter();
  const pathname = usePathname();

  const setTagParam = (tag: string) => {
    const params = new URLSearchParams(window.location.search);
    if (tagParam === tag) {
      params.delete("tag");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }
    params.set("tag", tag);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 w-fit">
      {tags.map((tag) => (
        <Button
          variant={tagParam === tag.name ? "default" : "outline"}
          size={"sm"}
          className="rounded-full"
          key={tag.id}
          onClick={() => setTagParam(tag.name)}
        >
          {tag.name}
        </Button>
      ))}
    </div>
  );
};
