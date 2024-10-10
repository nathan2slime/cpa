'use client';
import React, { useEffect } from 'react';
import QRCod from 'qrcode';
import { toast } from '@/components/ui/use-toast';

type TQRCode = {
  text: string;
};

export const NewQRCode = ({
  text = 'https://anderson-kauer.vercel.app/',
}: TQRCode) => {
  useEffect(() => {
    QRCod.toCanvas(document.getElementById('canvas'), text, function (error) {
      if (error) console.error(error);
      toast({
        title: 'Bem-vindo!',
        description: 'Acesse o QR Code para responder a avaliação!',
      });
    });
  });

  return <canvas id="canvas" className="m-auto" />;
};
