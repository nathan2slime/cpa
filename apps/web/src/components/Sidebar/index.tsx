import { FileText, LogOut, ScrollText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const Sidebar = () => {
  return (
    <>
      <div className="max-md:w-[100px] max-md:overflow-hidden px-2 relative z-40 w-80 h-screen transition-transform -translate-x-2 md:translate-x-0">
        <Link href="/">
          <h1 className="h-[60px] text-2xl p-4 font-semibold">UniFacema</h1>
        </Link>
        <aside
          id="sidebar"
          className="w-full px-2 h-[90%]"
          aria-label="Sidebar"
        >
          <div className="h-full rounded-xl px-3 max-sm:px-0 py-4 overflow-y-auto bg-gray-50">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="#"
                  className="flex items-center max-md:justify-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3 max-md:hidden">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/relatorio"
                  className="flex items-center max-md:justify-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <ScrollText size={18} />
                  <span className="ms-3 max-md:hidden">Relatório</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/new-form"
                  className="flex items-center max-md:justify-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FileText size={18} />
                  <span className="ms-3 max-md:hidden">Novo Formulário</span>
                </Link>
              </li>
            </ul>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <li>
                <Link
                  href="#"
                  className="flex items-center max-md:justify-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <LogOut size={18} />
                  <span className="ms-3 max-md:hidden">Sair</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};
