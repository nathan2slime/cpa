import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import { AppChildren } from '@/types';
import { cn } from '@/lib/utils';

import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // usar para avisos na ui do usuario - usar em 1s

export const metadata: Metadata = {
  title: 'Unifacema - Avaliação',
  description: 'Avaliação Institucional',
};

const RootLayout = ({ children }: Readonly<AppChildren>) => {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          'min-h-screen w-full bg-gray-200 flex',
          GeistSans.className,
        )}
      >
        <div className="px-4 w-full">{children}</div>
        <Toaster />
      </body>
    </html>
  );
};
export default RootLayout;
