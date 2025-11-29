"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, FileText, ListChecks, Loader2, Plus } from "lucide-react";
import { QuestionItem } from "@/components/form/question-item";
import type { QuestionTypeEnum } from "@/types/question";
import { useQuestions, useCreateQuestion, useForm } from "@/hooks/api-hooks";
import { useParams } from "next/navigation";

export function QuestionsTab() {
  const params = useParams();
  const formId = params.id as string;

  const { data: questions = [], isLoading, error } = useQuestions(formId);
  const { data: form } = useForm(formId);
  const createQuestionMutation = useCreateQuestion();

  const handleCreateQuestion = async (type: QuestionTypeEnum) => {
    await createQuestionMutation.mutateAsync({ type, formId });
  };

  return (
    <>
      <QuestionHeader
        questionsCount={questions.length}
        isCreating={createQuestionMutation.isPending}
        loading={isLoading}
        handleCreateQuestion={handleCreateQuestion}
        disabled={form?.hasResponses}
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Ocorreu um erro ao carregar as questões."}
          </AlertDescription>
        </Alert>
      )}

      <QuestionsList
        loading={isLoading}
        questions={questions}
        disabled={form?.hasResponses}
      />
    </>
  );
}

interface QuestionHeaderProps {
  questionsCount: number;
  isCreating: boolean;
  loading: boolean;
  handleCreateQuestion: (type: QuestionTypeEnum) => Promise<void>;
  disabled?: boolean;
}

function QuestionHeader({
  questionsCount,
  isCreating,
  loading,
  handleCreateQuestion,
  disabled,
}: QuestionHeaderProps) {
  return (
    <div className="mb-3">
      <h3 className="text-lg font-medium mb-1">
        {questionsCount} {questionsCount === 1 ? "Questão" : "Questões"}
      </h3>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => handleCreateQuestion("TEXT" as QuestionTypeEnum)}
          disabled={isCreating || loading || disabled}
        >
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileText className="mr-2 h-4 w-4" />
          )}
          Adicionar Questão Aberta
        </Button>
        <Button
          onClick={() => handleCreateQuestion("CHOOSE" as QuestionTypeEnum)}
          disabled={isCreating || loading || disabled}
        >
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ListChecks className="mr-2 h-4 w-4" />
          )}
          Adicionar Questão Fechada
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            handleCreateQuestion("CHOOSE_AND_TEXT" as QuestionTypeEnum)
          }
          disabled={isCreating || loading || disabled}
        >
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ListChecks className="mr-2 h-4 w-4" />
          )}
          Adicionar Questão Multivalorada
        </Button>
      </div>
    </div>
  );
}

interface QuestionsListProps {
  loading: boolean;
  questions: any[];
  disabled?: boolean;
}

function QuestionsList({ loading, questions, disabled }: QuestionsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <div className="flex justify-center">
          <Plus className="h-12 w-12 text-gray-300" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Nenhuma Questão Cadastrada
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Inicie cadastrando uma questão discursiva ou de múltipla escolha.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto">
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          id={question.id}
          title={question.title}
          type={question.type as QuestionTypeEnum}
          mandatory={question.mandatory}
          index={index + 1}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
