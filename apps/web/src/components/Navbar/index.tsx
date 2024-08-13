import {Input} from "@/components/ui/input";
import {Bell, ChevronDown} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import Link from "next/link";

export  const Navbar = () => {
    return (
        <header className="flex justify-between items-center gap-4 h-[60px] w-full p-4">
            <Link href="/">
                <h1 className="h-[60px] text-2xl p-4 font-semibold">UniFacema</h1>
            </Link>
            <span className="flex gap-4  " >
                <Input type="text" placeholder="Pesquisar" className="w-min"/>
            <span className="flex justify-center items-center" >
                <Bell size={14}/>
            </span>
            <DropdownMenu dir="rtl" modal>
                <DropdownMenuTrigger className="flex items-center">
                    <Avatar className="w-[30px] h-[30px] cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ChevronDown size={18}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Jhonathan</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Minha conta</DropdownMenuItem>
                    <DropdownMenuItem>Sair</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </span>
        </header>
    )

}
