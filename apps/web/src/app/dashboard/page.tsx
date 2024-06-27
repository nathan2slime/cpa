import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Bell, ChevronDown } from 'lucide-react';
import React from 'react';
import GraphMain from '@/components/GrafMain';
//import { Input } from '@/components/ui/input';
import { CardRecentAv } from '@/components/CardRecentAv';
import { WrapperEvent } from '@/components/CreateEventWrapper';

import { eventsRecents } from '@/database/eventsRecents';

export default function PageDashboard() {
  return (
    <>
      <section className="w-full">


        <main className="pb-20 md:pr-24 w-full h-[90vh] custom-scrollbar overflow-y-auto">
          <section className="w-full  m-auto mb-4 grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Relatorio</CardTitle>
                <CardDescription>Formularios Respondidos</CardDescription>
              </CardHeader>
              <CardContent>
                <GraphMain />
              </CardContent>
              <CardFooter>
                <p className="text-sm italic text-gray-600">relatorios / mês</p>
              </CardFooter>
            </Card>

            <Card className="w-[400px] max-lg:w-full h-full">
              <CardHeader>
                <CardTitle className="text-lg">Recentes</CardTitle>
                <CardDescription>
                  Avaliações criadas recentemente
                </CardDescription>
              </CardHeader>
              <CardContent className="custom-scrollbar h-96 overflow-y-auto overflow-x-hidden">
                {eventsRecents.map((r, index) => (
                  <div key={index}>
                    <CardRecentAv
                      id={index}
                      name={r.name}
                      description={r.description}
                      date={r.date}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
          <WrapperEvent />
        </main>
      </section>
    </>
  );
}
