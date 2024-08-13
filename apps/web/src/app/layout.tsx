import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import { AppChildren } from '@/types';
import { fonts } from '@/global/fonts';

import { RootProvider } from '@/components/providers/root';
import { AuthProvider } from '@/components/providers/auth';
import { toaster } from '@/lib/toaster';

import '@/global/styles.scss';

export const metadata: Metadata = {
  title: 'CPA UniFacema',
};

const RootLayout = ({ children }: Readonly<AppChildren>) => {
  return (
    <html lang="pt-br">
      <body className={fonts}>
        <RootProvider>
          <AuthProvider>{children}</AuthProvider>
        </RootProvider>
        <Toaster {...toaster} />
      </body>
    </html>
  );
};

export default RootLayout;
