import { Nunito } from 'next/font/google';

import { cn } from '@/lib/utils';

const base = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const fonts = cn(base.className, 'dark');
