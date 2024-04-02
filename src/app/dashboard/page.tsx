import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Bell, ChevronDown } from "lucide-react"
import React from "react"
import GraphMain from "@/components/GrafMain"
import { Input } from "@/components/ui/input"

export default function PageDashboard() {
  return (
    <>
      <section className="w-full">

        <header className="flex justify-end items-center gap-4 h-[60px] w-full p-4">
          <Input type="text" placeholder="Pesquisar" className="w-min" />

          <Bell size={14} />
          <DropdownMenu dir="rtl" modal>
            <DropdownMenuTrigger className="flex items-center">
              <Avatar className="w-[30px] h-[30px] cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ChevronDown size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Jhonathan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Minha conta</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </header>

        <main className="w-full h-[80vh] bg-white overflow-y-auto rounded-xl">

          <Card>
            <CardHeader>
              <CardTitle>Relatorio</CardTitle>
              <CardDescription>Formularios Respondidos</CardDescription>
            </CardHeader>
            <CardContent>
              <GraphMain />
            </CardContent>
            <CardFooter>
              <p className="text-sm italic text-gray-600">relatorios / mês</p>
            </CardFooter>
          </Card>
        </main>
      </section>
    </>
  )

}
