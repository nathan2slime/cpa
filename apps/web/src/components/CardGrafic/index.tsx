import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Text } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export const QuestionGrafic = (): React.ReactNode => {
  return (
    <DropdownMenu>
      <Button variant="ghost">
        <DropdownMenuTrigger>
          {' '}
          <Text />
        </DropdownMenuTrigger>
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
