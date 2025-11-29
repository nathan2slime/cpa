"use client";

import QuestionOptions from "@/components/form/question-option";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteQuestion,
  useDuplicateQuestion,
  useUpdateQuestion,
} from "@/hooks/api-hooks";
import type { QuestionTypeEnum } from "@/types/question";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface QuestionItemProps {
  id: string;
  title: string;
  type: QuestionTypeEnum;
  mandatory: boolean;
  index: number;
  disabled?: boolean;
}

export function QuestionItem({
  id,
  title,
  type,
  mandatory,
  index,
  disabled,
}: QuestionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [questionTitle, setQuestionTitle] = useState(title);

  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();
  const duplicateQuestionMutation = useDuplicateQuestion();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (questionTitle !== title) {
      updateQuestionMutation.mutate({
        questionId: id,
        data: { title: questionTitle },
      });
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  const handleDelete = () => {
    deleteQuestionMutation.mutate(id);
  };

  const handleDuplicate = () => {
    duplicateQuestionMutation.mutate(id);
  };

  const getTypeLabel = (type: QuestionTypeEnum) => {
    switch (type) {
      case "TEXT":
        return "Aberta";
      case "CHOOSE":
        return "Fechada";
      case "CHOOSE_AND_TEXT":
        return "Multivalorada";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 flex flex-row items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
            {index}
          </span>
          {isEditing ? (
            <Input
              value={questionTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              className="max-w-[300px]"
            />
          ) : (
            <h3
              className="font-medium cursor-pointer"
              onClick={() => !disabled && setIsEditing(true)}
            >
              {questionTitle}
              {mandatory && <span className="text-red-500 ml-1">*</span>}
            </h3>
          )}
          <Badge variant={"secondary"} className="ml-2 whitespace-nowrap">
            {getTypeLabel(type)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              id={`mandatory-${id}`}
              checked={mandatory}
              onCheckedChange={(checked: boolean) =>
                updateQuestionMutation.mutate({
                  questionId: id,
                  data: { mandatory: checked },
                })
              }
            />
            <Label htmlFor={`mandatory-${id}`}>Obrigatória</Label>
          </div>
        </div>
        {!disabled && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {(type === "TEXT" || type === "CHOOSE_AND_TEXT") && (
          <Textarea
            disabled
            placeholder="Usuário irá digitar a resposta aqui..."
          />
        )}
        {(type === "CHOOSE" || type === "CHOOSE_AND_TEXT") && (
          <QuestionOptions questionId={id} disabled={disabled} />
        )}
      </CardContent>
    </Card>
  );
}
