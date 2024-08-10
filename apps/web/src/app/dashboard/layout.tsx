import { Sidebar } from '@/components/Sidebar';

import { AppChildren } from '@/types';
import {Navbar} from "@/components/Navbar";

const LayoutDashboard = ({ children }: Readonly<AppChildren>) => {
  return (
    <main className="min-h-screen w-full bg-gray-200 ">
        <Navbar/>

      <div className=" flex flex-row min-h-screen  px-4 w-full">
          <Sidebar />
        {children}
      </div>
    </main>
  );
};

export default LayoutDashboard;
