'use client'
import React, { useEffect } from 'react'
import QRCod from 'qrcode'
import { toast } from '@/components/ui/use-toast'

type TQRCode = {
  text: string
}

const QRCode = ({ text = 'https://anderson-kauer.vercel.app/' }: TQRCode) => {

  useEffect(() => {
    QRCod.toCanvas(document.getElementById('canvas'), text, function(error) {
      if (error) console.error(error)
      toast({
        title: "Bem-vindo!",
        description: "Acesse o QR Code para responder a avaliação!",
      })
    })
  });

  return (
    <div className='h-screen m-auto bg-gray-200 grid place-items-center'>
      <div className='bg-white border-border text-md p-4 rounded-lg shadow-lg'>
        <h1>Unifacema - Avaliação</h1>
        <canvas id="canvas" className='m-auto'></canvas>
      </div>
    </div>
  )
}
export default QRCode
