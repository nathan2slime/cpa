"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSnapshot } from "valtio";
import { authState } from "@/store/auth.state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCanAnswer, useCreateAnswer, useEvent } from "@/hooks/api-hooks";
import type { OptionType } from "@/types/options.types";
import { type QuestionType, QuestionTypeEnum } from "@/types/question";
import FormErrorMessage from "@/components/form-error-message";

type FormAnswers = {
  [questionId: string]: any;
};

const Answer = () => {
  const { id } = useParams();
  const eventId = typeof id === "string" ? id : undefined;

  const { data: status, isLoading: isLoadingStatus } = useCanAnswer(eventId);
  const { data: event } = useEvent(eventId as string);
  const mutation = useCreateAnswer();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAnswers>();

  const { logged, loading } = useSnapshot(authState);

  useEffect(() => {
    if (!loading && !logged) {
      toast("Você precisa estar logado para responder a este formulário.");
    }
  }, [logged, loading]);

  if (isLoadingStatus) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status !== 200) return <FormErrorMessage status={status || 500} />;

  const form = event?.form;
  if (!form) return null;

  const onSubmit = async (formValues: FormAnswers) => {
    const answers: {
      eventId: string;
      data: {
        value: string;
        optionId: string;
        questionId: string;
      }[];
    } = {
      eventId: id as string,
      data: [],
    };

    for (const question of form.questions || []) {
      const qId = question.id;

      switch (question.type) {
        case QuestionTypeEnum.CHOOSE:
          if (question.mandatory && !formValues[qId])
            return toast(
              `Por favor, responda a questão obrigatória: ${question.title}`
            );
          answers.data.push({
            questionId: qId,
            optionId: formValues[qId],
            value: "",
          });
          break;

        case QuestionTypeEnum.TEXT:
          if (question.mandatory && !formValues[qId]?.trim())
            return toast(
              `Por favor, responda a questão obrigatória: ${question.title}`
            );
          answers.data.push({
            questionId: qId,
            optionId: "",
            value: formValues[qId],
          });
          break;

        case QuestionTypeEnum.CHOOSE_AND_TEXT: {
          const selectedOption = formValues[`${qId}_options`] || "";
          const text = formValues[`${qId}_text`] || "";

          if (question.mandatory && !selectedOption && !text.trim()) {
            return toast(
              `Por favor, responda a questão obrigatória: ${question.title}`
            );
          }

          answers.data.push({
            questionId: qId,
            optionId: selectedOption || "",
            value: text.trim() || "",
          });

          break;
        }
      }
    }

    mutation.mutate(answers);
  };

  const renderQuestion = (question: QuestionType) => {
    switch (question.type) {
      case QuestionTypeEnum.CHOOSE:
        return (
          <Controller
            name={question.id}
            control={control}
            rules={{ required: question.mandatory }}
            render={({ field }) => (
              <RadioGroup
                className="space-y-2"
                onValueChange={field.onChange}
                value={field.value}
              >
                {question.options?.map((option: OptionType) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <label htmlFor={option.id} className="text-sm">
                      {option.title}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        );

      case QuestionTypeEnum.TEXT:
        return (
          <Controller
            name={question.id}
            control={control}
            rules={{ required: question.mandatory }}
            render={({ field }) => (
              <Textarea placeholder="Digite sua resposta..." {...field} />
            )}
          />
        );

      case QuestionTypeEnum.CHOOSE_AND_TEXT:
        return (
          <div className="space-y-4">
            <Controller
              name={`${question.id}_options`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup
                  className="space-y-2"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {question.options?.map((option: OptionType) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <label htmlFor={option.id} className="text-sm">
                        {option.title}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            <Controller
              name={`${question.id}_text`}
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="Complemento ou justificativa..."
                  {...field}
                />
              )}
            />
          </div>
        );

      default:
        return <div>Tipo de pergunta desconhecido</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <Card className="w-full border-t-8 border-t-primary">
        <CardHeader>
          <CardTitle className="text-2xl">{form.title}</CardTitle>
        </CardHeader>
      </Card>

      {form.questions?.map((question: QuestionType) => (
        <Card key={question.id}>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-medium text-base">
              {question.title}
              {question.mandatory && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </h4>
            {renderQuestion(question)}
          </CardContent>
        </Card>
      ))}

      {Object.entries(errors).length > 0 && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 font-medium">
              Preencha corretamente todas as questões obrigatórias.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end pb-8">
        <Button type="submit" size="lg">
          Enviar respostas
        </Button>
      </div>
    </form>
  );
};

export default Answer;
