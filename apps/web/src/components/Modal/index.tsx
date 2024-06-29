import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

type TModal = { title?: string; onClick?: () => void };

export function Modal({ title = 'Compartilhar', onClick }: TModal) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={onClick}
          variant="outline"
          className="bg-green-400 hover:bg-green-500 hover:text-white transition-all delay-100"
        >
          Confirmar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Todos poderão acessar através deste link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://teste.form/avaliacao"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-min">
              Fechar
            </Button>
          </DialogClose>

          <Link href="/form/avaliacao" target='_blankk' >
            <Button type="button" variant="secondary" className="w-min">
              Visualizar
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
