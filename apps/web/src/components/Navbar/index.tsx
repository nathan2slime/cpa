'use client';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useSnapshot } from 'valtio';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { authState } from '@/store/auth.state';
import { UserData } from '@/types/auth.types';

export const Navbar = () => {
  const { data } = useSnapshot(authState);

  const user = (data && data.user) as UserData;

  return (
    <header className="flex justify-between items-center gap-4 h-[60px] w-full bg-card border border-border rounded-lg p-4">
      <Link href="/dashboard">
        <img
          src="/assets/imgs/university.png"
          className="w-full max-w-[50px]"
        />
      </Link>
      <span className="flex gap-4">
        <DropdownMenu dir="ltr">
          <DropdownMenuTrigger className="flex items-center rounded-lg">
            <Avatar className="w-[30px] h-[30px] cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-sm font-bold">
              {user.login}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </header>
  );
};
