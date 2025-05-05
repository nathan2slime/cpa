"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Control } from "react-hook-form"
import type { EventForm } from "@/types/event.types"

interface EventBasicInfoProps {
  control: Control<EventForm>
}

export function EventBasicInfo({ control }: EventBasicInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Informações Básicas</h2>

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Insira o título do evento" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Insira a descrição do evento" className="min-h-[120px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="responsible"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pessoa Responsável</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Insira o nome da pessoa responsável" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
