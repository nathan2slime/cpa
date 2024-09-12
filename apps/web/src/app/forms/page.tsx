"use client";

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { FormReq } from '@/types/form';
import { Trash2 } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


function Forms() {
  // Simula os formulários criados
  const [forms, setForms] = useState<FormReq[]>();

  //redireciona para o formulário
  const redirectToForm = (id: string) => {
    location.href = `/form/${id}`
  }

  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(params.get("page") || "1");
  const [totalForms, setTotalForms] = useState<number>(0);

  //limite por pagina de formularios q serão pegos
  const perPage = 6

  //quantidade de paginas totais arredondadas
  const pagesRounded = Math.ceil(totalForms / perPage);

  //muda o parametro page da url
  const setParams = (page: number) => {
    setPage(String(page));
    params.set("page", String(page));

    window.history.pushState(null, "", `?${params.toString()}`);
  };

  //criar um formulário e redireciona para o mesmo
  const createForm = async () => {
    const res = await api.post(`/api/form/create`, {
      title: "Rascunho"
    })
    redirectToForm(res.data.id)
  }

  const getForms = async () => {
    try {
      const res = await api.get<FormReq[]>(`/api/form/search?page=${page}&perPage=${perPage}`);
      setForms(res.data.data);
      setTotalForms(res.data.total);
    } catch (error) {
      console.error('Erro ao buscar formulários:', error);
    }
  };

  useEffect(() => {
    getForms()
  }, [page]);

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

          <div className='border w-full rounded-xl'>
            {
              forms?.length === 0 && <p>Sem formulários criados, crie um formulario no botão acima "Criar novo formulário".</p>
            }
            {
              forms  && (
                <div>
                  {
                    forms.map(form => (
                      <div key={form.id} onClick={()=> redirectToForm(form.id)} className={'flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-100 cursor-pointer border-xl'}>
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
              <Button variant={'ghost'} disabled={Number(page) - 1 <= 0} className={'cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed'} onClick={()=> page > 1 ? setParams( page -1 ) : null }>Anterior</Button>
            </PaginationItem>
            <PaginationItem>
              <Button variant={'ghost'} disabled={Number(page) - 1 <= 0} onClick={()=> Number(page) - 2 <= 0 ? setParams(Number(page) -1) : setParams(Number(page) - 2)}>{Number(page) - 2 < 1 ? 1 : Number(page) - 1}</Button>
            </PaginationItem>
            <PaginationItem>
              <Button variant={'ghost'} disabled={Number(page) + 1 > pagesRounded && Number(page) + 2 > pagesRounded} onClick={()=> Number(page) + 2 > pagesRounded ? null : setParams((Number(page) + 2)) }>{Number(page) + 2}</Button>
            </PaginationItem>
            <PaginationItem>
              <Button variant={'ghost'} disabled={Number(page) + 1 > pagesRounded} className={'cursor-pointer'} onClick={()=> Number(page) + 1 > pagesRounded ? null : setParams(Number(page) + 1)}>Próximo</Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </main>
    </>
  );
}

export default Forms;
