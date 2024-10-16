'use client';
import React, { useEffect } from 'react';
import QRCod from 'qrcode';
import { toast } from '@/components/ui/use-toast';

type TQRCode = {
  text: string;
  size?: number 
};

export const NewQRCode = ({
  text = 'texto',
  size = 400
}: TQRCode) => {
  useEffect(() => {
    QRCod.toCanvas(document.getElementById('canvas'), text, {
      width: size
    }, function (error) {
      if (error) console.error(error);
    });
  });

  return <canvas id="canvas" className="m-auto" />;
};
