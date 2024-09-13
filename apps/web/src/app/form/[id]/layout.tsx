import { Sidebar } from '@/components/core/sidebar';

import { AppChildren } from '@/types'
import React from 'react';
import { HeaderForm } from '@/app/form/components/HeaderForm';

export default ({ children }: Readonly<AppChildren>) => {
  return (
    <main className="w-full h-full">
      <HeaderForm />

      <div className="w-full flex pt-[60px] overflow-y-auto items-start h-screen">
        <Sidebar />

        <div className="w-full h-full p-4">{children}</div>
      </div>
    </main>
  );
};