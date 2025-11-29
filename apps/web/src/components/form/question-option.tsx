"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateOptions,
  useDeleteOptions,
  useOptions,
  useUpdateOptions,
} from "@/hooks/api-hooks";
import { Loader2, Plus, Trash } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface QuestionOptionsProps {
  questionId: string;
  disabled?: boolean;
}

export default function QuestionOptions({
  questionId,
  disabled,
}: QuestionOptionsProps) {
  const { data: options = [], isLoading } = useOptions(questionId);
  const createOptionMutation = useCreateOptions(questionId);
  const updateOptionMutation = useUpdateOptions(questionId);
  const deleteOptionMutation = useDeleteOptions(questionId);

  const [editingOptionId, setEditingOptionId] = useState<string | null>(null);
  const [editingOptionTitle, setEditingOptionTitle] = useState("");

  const handleCreateOption = () => {
    createOptionMutation.mutate();
  };

  const handleStartEditOption = (option: any) => {
    setEditingOptionId(option.id);
    setEditingOptionTitle(option.title);
  };

  const handleOptionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingOptionTitle(e.target.value);
  };

  const handleOptionTitleBlur = () => {
    if (editingOptionId) {
      updateOptionMutation.mutate({
        optionId: editingOptionId,
        title: editingOptionTitle,
      });
      setEditingOptionId(null);
    }
  };

  const handleOptionTitleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleOptionTitleBlur();
    }
  };

  const handleDeleteOption = (optionId: string) => {
    deleteOptionMutation.mutate(optionId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2 ml-6">
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center gap-2">
            <input
              type="radio"
              disabled
              className="mr-2"
              id={`option-${index}`}
            />
            {editingOptionId === option.id ? (
              <Input
                value={editingOptionTitle}
                onChange={handleOptionTitleChange}
                onBlur={handleOptionTitleBlur}
                onKeyDown={handleOptionTitleKeyDown}
                autoFocus
                className="h-8 text-sm"
              />
            ) : (
              <label
                htmlFor={`option-${index}`}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 w-full cursor-pointer hover:bg-gray-50"
                onClick={() => !disabled && handleStartEditOption(option)}
              >
                {option.title || "Opção sem título"}
              </label>
            )}
            {!disabled && (
              <Button
                variant="ghost"
                onClick={() => handleDeleteOption(option.id)}
              >
                <Trash size={14} className="text-red-500" />
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={handleCreateOption}
          disabled={createOptionMutation.isPending || disabled}
        >
          {createOptionMutation.isPending ? (
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          ) : (
            <Plus className="mr-2 h-3 w-3" />
          )}
          Adicionar Opção
        </Button>
      </div>
    </div>
  );
}
