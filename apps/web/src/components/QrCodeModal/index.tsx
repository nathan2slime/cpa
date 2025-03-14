import { useQRCode } from 'next-qrcode';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { QrCode } from 'lucide-react';
import { copyTextToTranferArea } from '@/lib/utils';

type Props = {
  text: string;
};

export const QrCodeModal = ({ text }: Props) => {
  const { Canvas } = useQRCode();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            <Canvas
              text={text}
              options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 300,
                color: {
                  dark: '#000',
                  light: '#FFFF',
                },
              }}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          <div className='w-full flex items-center justify-center'>
            <Button onClick={() => copyTextToTranferArea(text)} variant={"link"}>Copiar link de resposta</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
