"use client"

import type { ChangeEvent, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputSearchSelectProps {
  children: ReactNode
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  className?: string
}

export function InputSearchSelect({ children, onChange, value, className }: InputSearchSelectProps) {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className={cn("w-full", className)}
      />
      {value && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  )
}

interface SelectItemSearchProps {
  name: string
  value: string
  onClick: () => void
}

export function SelectItemSearch({ name, value, onClick }: SelectItemSearchProps) {
  return (
    <div
      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
      data-value={value}
    >
      {name}
    </div>
  )
}
