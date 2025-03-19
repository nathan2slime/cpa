'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy } from 'lucide-react'
import Link from 'next/link'

type TModal = { formId?: string; onClose?: () => void }

export function Modal({ formId = '', onClose }: TModal) {
  const host = window.location.origin

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-400 hover:bg-green-500 hover:text-white transition-all delay-100">
          Confirmar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Formulario</DialogTitle>
          <DialogDescription>Todos poderão acessar através deste link.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={`${host}/qrcode/${formId}`} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={onClose} className="w-min">
              Fechar
            </Button>
          </DialogClose>

          <Link href={`${host}/qrcode/${formId}`} target="_blank">
            <Button type="button" variant="secondary" className="w-min">
              QRCode
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
