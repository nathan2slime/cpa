import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { Text } from 'lucide-react'


export const QuestionGrafic = (): React.ReactNode => {
  return (
    <DropdownMenu>
      <Button variant="ghost" >
        <DropdownMenuTrigger> <Text /></DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        <DropdownMenuLabel>Gráficos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Pizza</DropdownMenuItem>
        <DropdownMenuItem>Barras</DropdownMenuItem>
        <DropdownMenuItem>Barras Vertical</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

