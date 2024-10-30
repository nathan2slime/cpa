'use client';

import {orderBy} from 'lodash'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { EventFormResponse, EventReq } from '@/types/event.types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
import { QrCode } from 'lucide-react';
import { NewQRCode } from '@/components/GenerateQRCode';
import { copyToClipboard } from '@/components/CopyTransferArea';
import { PaginationComponent } from '@/components/PaginationComponent';

import toast from 'react-hot-toast';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const Events = () => {

  const [events, setEvents] = useState<EventReq[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1)
  const router = useRouter()
  const host = window.location.origin;

  //limite por pagina de formularios q serão pegos
  const perPage = 5;

  //quantidade de paginas totais arredondadas
  const pagesRounded = Math.ceil(totalEvents / perPage);

  const getEvents = async () => {

    const { data } = await api.get<EventFormResponse>(
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
            {events?.map((event: EventReq) => (
              <div
                key={event.id}
                className={
                  'flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl'
                }
              >
                <div className={'flex gap-3 items-center'}>
                  <p className={'font-semibold'}>{event.title}</p>
                  <p className={'text-gray-500 text-sm'}>
                    {
                      event && event.updatedAt &&
                        formatDistanceToNow(event.updatedAt, {
                          addSuffix: true,
                          locale: ptBR,
                        })
                    }
                  </p>
                </div>

                <div className={'flex gap-2 items-center'}>
                  <Dialog>
                    <DialogTrigger>
                      <QrCode className='p-1 border rounded' size={35}/>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className='text-center'>
                          QrCode - {event.title}
                        </DialogTitle>
                      </DialogHeader>
                      <NewQRCode text={`${host}/form/${event.formId}`}/>
                      <div className='flex justify-center'>
                        <Button onClick={()=> copyToClipboard(`${host}/form/${event.formId}`)} variant={'link'}>Copiar link de resposta</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    onClick={() => event.id && router.push(`/event/${event.id}`)}
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
            {
              events.length === 0 &&
              <p className={'p-5'}>
                Sem Eventos criados {page > 0 && 'ou itens na paginação'}, crie um evento no botão acima
                "Criar novo evento".
              </p> 
            }
          </div>
        </div>  

        <PaginationComponent setPage={setPage} totalPages={pagesRounded}/>

      </main>
    </>
  );
};

export default Events;
