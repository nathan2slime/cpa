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
import { CardRecentAv } from "@/components/CardRecentAv"
import { eventsRecents } from "@/database/eventsRecents"

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

        <main className="pb-10 w-full h-[90vh] custom-scrollbar overflow-y-auto rounded-xl">
          <section className="p-2 grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
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

            <Card className="w-[80%] max-md:w-full h-full max-lg:m-auto">
              <CardHeader>
                <CardTitle className="text-lg">Recentes</CardTitle>
                <CardDescription>Avaliações criadas recentemente</CardDescription>
              </CardHeader>
              <CardContent className="custom-scrollbar h-96 overflow-y-auto overflow-x-hidden">
                {eventsRecents.map((r) =>
                (
                  <CardRecentAv name={r.name} description={r.description} date={r.date} />
                ))
                }
              </CardContent>
            </Card>
          </section>
        </main>
      </section>
    </>
  )

}
