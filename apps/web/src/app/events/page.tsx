"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { EventForm } from '@/types/event.form.types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const Events = () => {

  const [events, setEvents] = useState<EventForm[]>([])

  const getEvents = async () => {
    const {data} = await api.get<EventForm[]>('api/event/show')
    const orderedEvents = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    setEvents(orderedEvents)
  }

  const deleteEvent = async (id: string) => {

  }

  const redirectToEvent = (id: string) => {
    location.href = `/event/${id}`
  }

  useEffect(() => {
    getEvents()
  }, []);

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">

        <div className={'justify-between w-full flex px-5 items-center'}>

          <p className={'font-semibold text-xl'}>Gerenciar Eventos</p>

          <Link href={'/new-event'}>
            <Button>
              Criar novo Evento
            </Button>
          </Link>

        </div>

        <div className={'p-5 w-full h-full'}>

          <p className={'font-semibold mb-3'}>Eventos recentes</p>

          <div className={'border w-full rounded-xl'}>
            {
              events.map((event: EventForm) => (
                <div key={event.id}
                     className={'flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl'}>
                  <div className={'flex gap-3 items-center'}>
                    <p className={'font-semibold'}>{event.title}</p>
                    <p className={'text-gray-500 text-sm'}>{formatDistanceToNow(event.updatedAt, {
                      addSuffix: true,
                      locale: ptBR
                    })}</p>
                  </div>

                  <div className={'flex gap-2 items-center'}>
                    <Button variant='outline' onClick={() => redirectToEvent(event.id)}>Editar</Button>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant='destructive'>Excluir</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tem certeza que deseja excluir esse formulário?</DialogTitle>
                          <DialogDescription>
                            Você não poderá reverter essa ação.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <div className={'flex justify-end gap-3'}>
                            <DialogClose asChild>
                              <Button onClick={()=> deleteEvent(event.id)} variant="destructive">Sim, apagar</Button>
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
              ))
            }
          </div>

        </div>

      </main>
    </>
  )
}

export default Events