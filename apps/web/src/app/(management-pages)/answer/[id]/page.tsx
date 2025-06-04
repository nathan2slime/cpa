"use client";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { useCanAnswer, useCreateAnswer, useEvent } from "@/hooks/api-hooks";
import { OptionType } from "@/types/options.types";
import { QuestionType, QuestionTypeEnum } from "@/types/question";
import FormErrorMessage from "@/components/form-error-message";

type FormAnswers = {
  [questionId: string]: any;
};

const Answer = () => {
  const { id } = useParams();
  const eventId = typeof id === "string" ? id : undefined;

  const { data: status } = useCanAnswer(eventId);
  const { data: event } = useEvent(eventId as string);
  const mutation = useCreateAnswer();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAnswers>();

  if (status && status !== 200) return <FormErrorMessage status={status} />;

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
          if (!formValues[qId])
            return alert("Por favor, responda todas as perguntas.");
          answers.data.push({
            questionId: qId,
            optionId: formValues[qId],
            value: "",
          });
          break;

        case QuestionTypeEnum.TEXT:
          if (!formValues[qId]?.trim())
            return alert("Por favor, responda todas as perguntas.");
          answers.data.push({
            questionId: qId,
            optionId: "",
            value: formValues[qId],
          });
          break;

        case QuestionTypeEnum.CHOOSE_AND_TEXT: {
          const selectedOption = formValues[`${qId}_options`] || "";
          const text = formValues[`${qId}_text`] || "";

          if (!selectedOption && !text.trim()) {
            return alert("Por favor, responda todas as perguntas.");
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
            rules={{ required: true }}
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
            rules={{ required: true }}
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-10 xl:min-w-[800px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{form.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {form.questions?.map((question: QuestionType) => (
              <div key={question.id} className="space-y-2">
                <h4 className="font-medium">{question.title}</h4>
                {renderQuestion(question)}
              </div>
            ))}

            {Object.entries(errors).length > 0 && (
              <p className="text-red-500">
                Preencha corretamente todas as questões
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Enviar respostas</Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default Answer;
