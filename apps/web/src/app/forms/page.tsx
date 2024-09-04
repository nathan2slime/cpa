import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Forms() {

  const form = false

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">

        <div className={'justify-between w-full flex border border-gray-200 p-3 px-6 rounded-xl items-center'}>

          <p className={'font-semibold text-xl'}>Gerenciar Formulários</p>

          <Link href={'/new-form'}>
            <Button>
              Criar novo formulário
            </Button>
          </Link>

        </div>

        <div className={'p-5 w-full h-full'}>

          <p className={'font-semibold mb-3'}>Formulários recentes</p>

          <div className={'border w-full max-h-full rounded-xl p-6'}>
            {
              !form && <p>Sem formulários criados, crie um formulario no botão acima "Criar novo formulário".</p>
            }
            {
              form &&

              <div>

              </div>
            }
          </div>

        </div>

      </main>
    </>
  );
}

export default Forms;