import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Events = () => {
  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">

        <div className={'justify-between w-full flex border border-gray-200 p-3 px-6 rounded-xl items-center'}>

          <p className={'font-semibold text-xl'}>Gerenciar Eventos</p>

          <Link href={'/new-event'}>
            <Button>
              Criar novo Evento
            </Button>
          </Link>

        </div>

        <div className={'p-5 w-full h-full'}>

          <p className={'font-semibold mb-3'}>Eventos recentes</p>

        </div>

      </main>
    </>
  )
}

export default Events