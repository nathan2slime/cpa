"use client";

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { FormReq } from '@/types/form';
import { Pen, Trash2 } from 'lucide-react';
import { useRouter } from 'next/router';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from 'next/navigation';


function Forms() {
  // Simula os formulários criados
  const [forms, setForms] = useState<FormReq[]>();

  const redirectToForm = (id: string) => {
    location.href = `/form/${id}`
  }

  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(params.get("page") || "1");
  const [totalForms, setTotalForms] = useState<number>(1);

  const setParams = (page: number) => {
    setPage(String(page));
    params.set("page", String(page));

    window.history.pushState(null, "", `?${params.toString()}`);
  };

  console.log(totalForms);

  //criar um formulário e redireciona para o mesmo
  const createForm = async () => {
    const res = await api.post(`/api/form/create`, {
      title: "Rascunho"
    })
    redirectToForm(res.data.id)
  }

  const getForms = async () => {
    try {
      const res = await api.get<FormReq[]>(`/api/form/search?perPage=6`);
      setForms(res.data.data);
      setTotalForms(res.data.total);
    } catch (error) {
      console.error('Erro ao buscar formulários:', error);
    }
  };

  useEffect(() => {
    getForms()
  }, []);

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">

        <div className={'justify-between w-full flex px-6 items-center'}>

          <p className={'font-semibold text-xl'}>Gerenciar Formulários</p>

          <Button onClick={createForm}>
            Criar novo formulário
          </Button>

        </div>

        <div className={'p-5 w-full h-full'}>

          <p className={'font-semibold mb-3'}>Formulários recentes</p>

          <div className='border w-full rounded-xl p-2'>
            {
              forms?.length === 0 && <p>Sem formulários criados, crie um formulario no botão acima "Criar novo formulário".</p>
            }
            {
              forms  && (
                <div>
                  {
                    forms.map(form => (
                      <div key={form.id} onClick={()=> redirectToForm(form.id)} className={'flex justify-between items-center p-4 border-b last:border-none hover:bg-gray-100 cursor-pointer border-xl'}>
                        <div>
                          <p className={'font-semibold'}>{form.title}</p>
                          {/*<p className={'text-sm text-gray-500'}>Tempo de resposta: {form.time}</p>*/}
                        </div>
                        <div className={'flex gap-2 items-center'}>
                          <Trash2 size={20} color={'red'} className={'hover:scale-110 transition'} />
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>

        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className={'cursor-pointer'} onClick={()=> page > 1 ? setParams( page -1 ) : null } />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={()=> setParams(Number(page) - 2)}>{Number(page) - 2}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={()=> setParams(Number(page) + 2)}>{Number(page) + 2}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className={'cursor-pointer'} onClick={()=> setParams(Number(page) + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>


      </main>
    </>
  );
}

export default Forms;
