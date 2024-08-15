import { Sidebar } from '@/components/Sidebar';

import { AppChildren } from '@/types';
import { Navbar } from '@/components/Navbar';

export default ({ children }: Readonly<AppChildren>) => {
  return (
    <main className="w-full h-full p-4">
      <Navbar />

      <div className=" flex flex-row min-h-screen  px-4 w-full">
        <Sidebar />
        {children}
      </div>
    </main>
  );
};
