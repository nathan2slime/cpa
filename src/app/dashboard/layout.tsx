import { Sidebar } from '@/components/Sidebar';

import { AppChildren } from '@/types';
const LayoutDashboard = ({ children }: Readonly<AppChildren>) => {
  return (
    <main className="min-h-screen w-full bg-gray-200 flex">
      <Sidebar />
      <div className="px-4 w-full">{children}</div>
    </main>
  );
};
export default LayoutDashboard;
