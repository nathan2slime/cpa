'use client'
import { toast } from '@/components/ui/use-toast'
import QRCod from 'qrcode'
import { useEffect } from 'react'

type TQRCode = {
  text: string
}

export const NewQRCode = ({ text = 'https://anderson-kauer.vercel.app/' }: TQRCode) => {
  useEffect(() => {
    QRCod.toCanvas(document.getElementById('canvas'), text, error => {
      if (error) console.error(error)
      toast({
        title: 'Bem-vindo!',
        description: 'Acesse o QR Code para responder a avaliação!'
      })
    })
  })

  return <canvas id="canvas" className="m-auto" />
}
