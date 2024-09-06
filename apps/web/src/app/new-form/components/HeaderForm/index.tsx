'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Avatar } from '@/components/ui/avatar';
import {
  FileText,
  StarIcon,
  Palette,
  EyeIcon,
  EllipsisIcon,
  Printer, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { authState } from '@/store/auth.state';
import { UserData } from '@/types/auth.types';

export const HeaderForm = () => {

  const { data } = useSnapshot(authState);

  const user = (data && data.user) as UserData;

  const [title, setTitle] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOpenModalTheme = () => {
    console.log('Open modal theme');
  };

  const handleEnviarClick = () => {
    console.log('Enviar');
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex justify-between items-center gap-4 h-[60px] w-full p-4 bg-white border-b border-b-gray-200">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <h4 className='font-bold tracking-wide'>UniFacema</h4>
        </Link>
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-min"
          placeholder="Formulário sem nome"
        />

        {/* Botão de favoritar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setFavorite(!favorite)}
        >
          <StarIcon
            size={20}
            color={favorite ? 'orange' : 'gray'}
            strokeWidth={2}
          />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleOpenModalTheme}>
          <Palette size={20} color="gray" />
        </Button>

        <Button variant="ghost" size="icon">
          <EyeIcon size={20} color="gray" />
        </Button>

        <div>
          <DropdownMenu dir="ltr" modal>
            <DropdownMenuTrigger className="flex items-center">
              <EllipsisIcon size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="md:hidden">
                <Button
                  onClick={handleEnviarClick}
                  className="bg-green-400 hover:bg-green-500 text-white w-full"
                >
                  Enviar
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Printer size={20} color="gray" />
                Imprimir
              </DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          onClick={handleEnviarClick}
          className="max-md:hidden bg-green-400 hover:bg-green-500 text-white"
        >
          Enviar
        </Button>

        <span className="flex gap-4">
        <DropdownMenu dir="ltr">
          <DropdownMenuTrigger
            className="flex items-center py-1 px-2 gap-2 outline-none bg-accent border border-border rounded-lg">
            <Avatar className="w-[30px] h-[30px] cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>

            <p className="text-accent-foreground text-sm font-normal">
              {user?.login}
            </p>

            <ChevronDown className="ml-4 w-4 text-accent-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
      </div>
    </header>
  );
};
