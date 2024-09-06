"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function Forms() {
  // Simula os formulários criados
  const [forms, setForms] = useState([
    { id: 1, name: 'Atividade 1', time: '10 minutos' },
    { id: 2, name: 'Atividade 2', time: '15 minutos' },
  ]);

  // Função para excluir um formulário
  const deleteForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

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
              forms.length === 0 && <p>Sem formulários criados, crie um formulario no botão acima "Criar novo formulário".</p>
            }
            {
              forms  && (
                <div>
                  {
                    forms.map(form => (
                      <div key={form.id} className={'flex justify-between items-center p-4 border-b'}>
                        <div>
                          <p className={'font-semibold'}>{form.name}</p>
                          <p className={'text-sm text-gray-500'}>Tempo de resposta: {form.time}</p>
                        </div>
                        <div className={'flex gap-2'}>
                          <Button variant="secondary" onClick={() => alert(`Editar ${form.name}`)}>Editar</Button>
                          <Button variant="destructive" onClick={() => deleteForm(form.id)}>Excluir</Button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>

        </div>

      </main>
    </>
  );
}

export default Forms;
