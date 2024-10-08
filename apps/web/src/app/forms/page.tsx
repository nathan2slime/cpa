'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { api } from '@/api';
import { FormReq, FormResponse } from '@/types/form';

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
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PaginationComponent } from '@/components/PaginationComponent';

function Forms() {
  // Simula os formulários criados
  const [forms, setForms] = useState<FormReq[]>();
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  //redireciona para o formulário
  const redirectToForm = (id: string) => {
    location.href = `/form/${id}`;
  };

  const deleteForm = async (id: string) => {
    await api.delete(`/api/form/remove/${id}`);
    setShouldFetch(!shouldFetch);
  };

  const [page, setPage] = useState<number>(1);

  const [totalForms, setTotalForms] = useState<number>(0);

  //limite por pagina de formularios q serão pegos
  const perPage = 5;

  //quantidade de paginas totais arredondadas
  const pagesRounded = Math.ceil(totalForms / perPage);

  //criar um formulário e redireciona para o mesmo
  const createForm = async () => {
    const res = await api.post(`/api/form/create`, {
      title: 'Rascunho',
    });
    redirectToForm(res.data.id);
  };

  const getForms = async () => {

    const {data} = await api.get<FormResponse>(
      `/api/form/search?page=${page}&perPage=${perPage}`,
    );

    const orderedForms = data.data.sort((a, b) => new Date(b.updatedAt ?? new Date()).getTime() - new Date(a.updatedAt ?? new Date()).getTime());
    setForms(orderedForms);
    setTotalForms(data.total);
  };

  useEffect(() => {
    getForms();
  }, [page, shouldFetch]);

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">
        <div className={'justify-between w-full flex px-5 items-center'}>
          <p className={'font-semibold text-xl'}>Gerenciar Formulários</p>

          <Button onClick={createForm}>Criar novo formulário</Button>
        </div>

        <div className={'p-5 w-full h-full'}>
          <p className={'font-semibold mb-3'}>Formulários recentes</p>

          <div className="border w-full rounded-xl">
            {forms?.length === 0 && (
              <p className={'p-5'}>
                Sem formulários criados, crie um formulario no botão acima
                "Criar novo formulário".
              </p>
            )}
            {forms && (
              <div>
                {forms.map((form) => (
                  <div
                    key={form.id}
                    className={
                      'flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl'
                    }
                  >
                    <div className={'flex gap-3 items-center'}>
                      <p className={'font-semibold'}>{form.title}</p>
                      <p className={'text-gray-500 text-sm'}>
                        {
                          form.updatedAt && form &&
                          formatDistanceToNow(new Date(form.updatedAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })
                        }
                      </p>
                    </div>
                    <div className={'flex gap-2 items-center'}>
                      <Button
                        variant="outline"
                        onClick={() => redirectToForm(form.id)}
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
                                  onClick={() => deleteForm(form.id)}
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
              </div>
            )}
          </div>
        </div>

        <PaginationComponent setPage={setPage} totalPages={pagesRounded}/>
        
      </main>
    </>
  );
}

export default Forms;
