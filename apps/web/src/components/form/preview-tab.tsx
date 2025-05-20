"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuestions } from "@/hooks/api-hooks";
import { useParams } from "next/navigation";

export function PreviewTab() {
  const params = useParams();
  const formId = params.id as string;

  const { data: questions = [], isLoading } = useQuestions(formId);

  if (isLoading) {
    return (
      <div className="text-center py-12">Carregando pré-visualização...</div>
    );
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-medium mb-6">
        Pré-visualização do Formulário
      </h3>

      {questions.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-gray-500">
            Adicione questões para visualizar o formulário.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <QuestionPreview
              key={question.id}
              question={question}
              index={index}
            />
          ))}

          <div className="pt-4">
            <Button>Enviar Respostas</Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface QuestionPreviewProps {
  question: any;
  index: number;
}

function QuestionPreview({ question, index }: QuestionPreviewProps) {
  return (
    <div className="border-b pb-4 last:border-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
          {index + 1}
        </span>
        <h4 className="font-medium">{question.title}</h4>
      </div>

      {question.type === "TEXT" ? (
        <Textarea placeholder="Digite sua resposta aqui..." />
      ) : question.type === "CHOOSE" ? (
        <ChoiceOptions index={index} />
      ) : (
        <ChoiceAndTextOptions index={index} />
      )}
    </div>
  );
}

interface ChoiceOptionsProps {
  index: number;
}

function ChoiceOptions({ index }: ChoiceOptionsProps) {
  return (
    <div className="ml-8 mt-2 space-y-2">
      <div className="flex items-center">
        <input
          type="radio"
          id={`option-${index}-1`}
          name={`question-${index}`}
          className="mr-2"
        />
        <label htmlFor={`option-${index}-1`}>Opção 1</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id={`option-${index}-2`}
          name={`question-${index}`}
          className="mr-2"
        />
        <label htmlFor={`option-${index}-2`}>Opção 2</label>
      </div>
    </div>
  );
}

interface ChoiceAndTextOptionsProps {
  index: number;
}

function ChoiceAndTextOptions({ index }: ChoiceAndTextOptionsProps) {
  return (
    <div className="ml-8 mt-2 space-y-2">
      <div className="flex items-center">
        <input
          type="radio"
          id={`option-${index}-1`}
          name={`question-${index}`}
          className="mr-2"
        />
        <label htmlFor={`option-${index}-1`}>Opção 1</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id={`option-${index}-2`}
          name={`question-${index}`}
          className="mr-2"
        />
        <label htmlFor={`option-${index}-2`}>Opção 2</label>
      </div>
      <Textarea placeholder="Digite sua resposta aqui..." />
    </div>
  );
}
