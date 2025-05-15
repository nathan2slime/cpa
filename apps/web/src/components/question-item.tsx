"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuestionManager } from "@/hooks/use-question-manager";
import type { OptionType } from "@/types/options.types";
import { QuestionTypeEnum } from "@/types/question";
import { CirclePlus, Copy, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

export type QuestionItemProps = {
  id: string;
  title: string;
  type: QuestionTypeEnum;
  index: number;
  onRefresh: () => void;
  formId: string;
};

export function QuestionItem({
  id,
  title,
  formId,
  type,
  index,
  onRefresh,
}: QuestionItemProps) {
  const [questionTitle, setQuestionTitle] = useState(title);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    getOptions,
    updateQuestionTitle,
    deleteQuestion,
    createOption,
    updateOption,
    deleteOption,
    duplicateQuestion,
  } = useQuestionManager({ formId });

  useEffect(() => {
    const fetchOptions = async () => {
      if (type === "CHOOSE" || type === "CHOOSE_AND_TEXT") {
        const optionsData = await getOptions(id);
        setOptions(optionsData);
      }
    };

    setQuestionTitle(title);
    fetchOptions();
  }, [id, title, type, getOptions]);

  const handleTitleUpdate = async () => {
    await updateQuestionTitle(id, questionTitle);
    onRefresh();
  };

  const handleDeleteQuestion = async () => {
    setIsLoading(true);
    await deleteQuestion(id);
    onRefresh();
    setIsLoading(false);
  };

  const handleCreateOption = async () => {
    setIsLoading(true);
    await createOption(id);
    const optionsData = await getOptions(id);
    setOptions(optionsData);
    setIsLoading(false);
  };

  const handleOptionUpdate = async (optionId: string, title: string) => {
    await updateOption(optionId, title);
    setOptions((prev) =>
      prev.map((option) =>
        option.id === optionId ? { ...option, title } : option
      )
    );
  };

  const handleDeleteOption = async (optionId: string) => {
    setIsLoading(true);
    await deleteOption(optionId);
    const optionsData = await getOptions(id);
    setOptions(optionsData);
    setIsLoading(false);
  };

  const handleDuplicateQuestion = async () => {
    setIsLoading(true);
    await duplicateQuestion(id, type);
    onRefresh();
    setIsLoading(false);
  };

  return (
    <Card className="mb-4 border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant="outline"
                className="h-8 w-8 rounded-full p-0 flex items-center justify-center font-semibold text-sm"
              >
                {index}
              </Badge>
              <Input
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                onBlur={handleTitleUpdate}
                className="font-medium"
                placeholder="Título da questão"
              />
              <Badge
                variant={
                  type === "TEXT"
                    ? "secondary"
                    : type === "CHOOSE"
                      ? "default"
                      : "outline"
                }
                className="ml-2 whitespace-nowrap"
              >
                {type === "TEXT"
                  ? "Texto"
                  : type === "CHOOSE"
                    ? "Escolha"
                    : "Escolha e Texto"}
              </Badge>
            </div>
            {type === "TEXT" && (
              <div className="ml-11">
                <Textarea
                  placeholder="O usuário irá digitar a resposta aqui..."
                  disabled
                  className="bg-gray-50 resize-none h-24"
                />
              </div>
            )}

            {(type === "CHOOSE" || type === "CHOOSE_AND_TEXT") && (
              <div className="ml-11 space-y-2">
                {options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Input
                      value={option.title}
                      onChange={(e) =>
                        handleOptionUpdate(option.id, e.target.value)
                      }
                      onBlur={() => updateOption(option.id, option.title)}
                      placeholder="Opção"
                      className="bg-white"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteOption(option.id)}
                            disabled={isLoading}
                          >
                            <X size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remover opção</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={handleCreateOption}
                  disabled={isLoading}
                >
                  <CirclePlus size={16} className="mr-2" />
                  Adicionar opção
                </Button>

                {type === "CHOOSE_AND_TEXT" && (
                  <div className="mt-4">
                    <Textarea
                      placeholder="O usuário irá digitar a resposta aqui..."
                      disabled
                      className="bg-gray-50 resize-none h-24"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-500 hover:text-gray-700"
                    onClick={handleDuplicateQuestion}
                    disabled={isLoading}
                  >
                    <Copy size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicar questão</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleDeleteQuestion}
                    disabled={isLoading}
                  >
                    <Trash2 size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remover questão</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
