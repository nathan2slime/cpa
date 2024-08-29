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
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeaderForm = () => {
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
    <header className="fixed top-0 left-0 z-50 flex justify-between items-center gap-4 h-[60px] w-full p-4 bg-white border-b border-b-gray-400">
      <div className="flex items-center gap-4">
        <FileText size={45} color="blue" strokeWidth={1} />
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

        <div>
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
