'use client';

import { api } from '@/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EventFormPaginationResponse, EventFormResponse } from '@/types/event.types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PaginationComponent } from '@/components/PaginationComponent';

import { QrCodeModal } from '@/components/QrCodeModal';
import toast from 'react-hot-toast';

const Events = () => {

  const [events, setEvents] = useState<EventFormResponse[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);

  const localurl = process.env.NEXT_PUBLIC_WEB_URL!

  //limite por pagina de formularios q serão pegos
  const perPage = 5;

  //quantidade de paginas totais arredondadas
  const pagesRounded = Math.ceil(totalEvents / perPage);

  const getEvents = async () => {
    const { data } = await api.get<EventFormPaginationResponse>(
      `api/event/show?page=${page}&perPage=${perPage}&sortField=updatedAt&sortOrder=desc`,
    );

    setTotalEvents(data.total);

    setEvents(data.data);
  };

  const deleteEvent = async (id: string) => {
    const { status } = await api.delete(`/api/event/delete/${id}`);
    if (status === 200) {
      setShouldFetch((prevState) => !prevState);
      toast.success('Evento deletado!');
    }
  };

  const redirectToEvent = (id: string) => {
    location.href = `/event/${id}`;
  };

  useEffect(() => {
    getEvents();
  }, [page, shouldFetch]);

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">
        <div className={'justify-between w-full flex px-5 items-center'}>
          <p className={'font-semibold text-xl'}>Gerenciar Eventos</p>

          <Link href={'/new-event'}>
            <Button>Criar novo Evento</Button>
          </Link>
        </div>

        <div className={'p-5 w-full h-full'}>
          <p className={'font-semibold mb-3'}>Eventos recentes</p>

          <div className={'border w-full rounded-xl'}>
            {events?.map((event: EventFormResponse) => (
              <div
                key={event.id}
                className={
                  'flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl'
                }
              >
                <div className={'flex gap-3 items-center'}>
                  <p className={'font-semibold'}>{event.title}</p>
                  <p className={'text-gray-500 text-sm'}>
                    {event &&
                      event.updatedAt &&
                      formatDistanceToNow(event.updatedAt, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                  </p>
                </div>

                <div className={'flex gap-2 items-center'}>
                  <QrCodeModal text={`${localurl}/answer/${event.id}`} />
                  <Button
                    variant="outline"
                    onClick={() => event.id && redirectToEvent(event.id)}
                  >
                    Editar
                  </Button>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="destructive">Excluir</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Tem certeza que deseja excluir esse formulário?
                        </DialogTitle>
                        <DialogDescription>
                          Você não poderá reverter essa ação.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <div className={'flex justify-end gap-3'}>
                          <DialogClose asChild>
                            <Button
                              onClick={() => event.id && deleteEvent(event.id)}
                              variant="destructive"
                            >
                              Sim, apagar
                            </Button>
                          </DialogClose>
                          <DialogClose>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <p className={'p-5'}>
                Sem Eventos criados {page > 0 && 'ou itens na paginação'}, crie
                um evento no botão acima "Criar novo evento".
              </p>
            )}
          </div>
        </div>

        <PaginationComponent setPage={setPage} totalPages={pagesRounded} />
      </main>
    </>
  );
};

export default Events;
