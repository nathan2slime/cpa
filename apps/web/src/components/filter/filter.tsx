"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Filter } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample tags - replace with your actual tags
const availableTags = [
  { id: "1", name: "React" },
  { id: "2", name: "Next.js" },
  { id: "3", name: "TypeScript" },
  { id: "4", name: "JavaScript" },
  { id: "5", name: "CSS" },
  { id: "6", name: "HTML" },
  { id: "7", name: "Tailwind" },
  { id: "8", name: "Node.js" },
]

export function TagFilter() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>
            {selectedTags.length > 0
              ? `${selectedTags.length} tag${selectedTags.length > 1 ? "s" : ""} selected`
              : "Filter by tags"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter by Tags</h4>
            <p className="text-sm text-muted-foreground">Select tags to filter content.</p>
          </div>
          <div className="grid gap-2 max-h-[300px] overflow-y-auto">
            {availableTags.map((tag) => (
              <div
                key={tag.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${
                  selectedTags.includes(tag.id) ? "bg-muted" : ""
                }`}
                onClick={() => toggleTag(tag.id)}
              >
                <span>{tag.name}</span>
                {selectedTags.includes(tag.id) && <Check className="h-4 w-4 text-primary" />}
              </div>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setSelectedTags([])} className="mt-2">
              Clear all
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}