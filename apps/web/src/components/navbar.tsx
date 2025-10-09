"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSnapshot } from "valtio";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authState } from "@/store/auth.state";
import { UserData } from "@/types/auth.types";
import { useSignOut } from "@/hooks/api-hooks/auth-api-hooks";

export const Navbar = () => {
  const { data } = useSnapshot(authState);
  const { mutate } = useSignOut();

  const user = (data && data.user) as UserData;
  const userTag = user?.login.slice(0, 2).toUpperCase();

  return (
    <header className="flex justify-between z-10 fixed items-center gap-4 h-[60px] w-[calc(100%-0px)] bg-card border-b border-border rounded-none p-4">
      <Link href="/dashboard">
        <h4 className="font-bold tracking-wide">SAI - Sistema Avaliação Institucional</h4>
      </Link>
      <span className="flex gap-4">
        <DropdownMenu dir="ltr">
          <DropdownMenuTrigger className="flex items-center py-1 px-2 gap-2 outline-none bg-accent border border-border rounded-lg">
            <Avatar className="w-[30px] h-[30px] cursor-pointer">
              <AvatarFallback>{userTag}</AvatarFallback>
            </Avatar>

            <p className="text-accent-foreground text-sm font-normal">
              {user?.login}
            </p>

            <ChevronDown className="ml-4 w-4 text-accent-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => mutate()}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </header>
  );
};
