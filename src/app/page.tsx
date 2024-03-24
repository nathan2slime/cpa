import { Question } from '@/components/Question';
import { dadosAvaliacao } from '@/mock/dataForm';

export default function Home() {
  const arr = Array(2).fill(0);
  return (
    <main className="flex min-h-screen flex-col md:p-24 p-8">
      <section className="rounded-xl bg-slate-100 p-8 max-w-4xl w-full h-full m-auto my-0 ">
        <h2 className="w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Avaliação Institucional
        </h2>

        {dadosAvaliacao.map((_, index) => (
          <Question
            key={index}
            numberQuestion={index + 1}
            question={dadosAvaliacao[index].question}
            options={dadosAvaliacao[index].options}
          />
        ))}
      </section>
    </main>
  );
}

// TODO: Pegar cada resposta e enviar junto com a pergunta para o 'backend'
// TODO: Criar uma page para exibir as respostas enviadas - opcional
