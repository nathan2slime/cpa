"use client";

import { Button } from "@/components/ui/button";
import { useQuestions, useReorderQuestions } from "@/hooks/api-hooks";
import { Question } from "@/types/report.type";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function OrderTab() {
  const params = useParams();
  const formId = params.id as string;

  const { data: questions = [], isLoading } = useQuestions(formId);
  const reorderMutation = useReorderQuestions();
  const [orderedQuestions, setOrderedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (questions.length > 0) {
      setOrderedQuestions([...questions]);
    }
  }, [questions]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOrderedQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const submit = () => {
    reorderMutation.mutate(orderedQuestions, {
      onSuccess: () => {
        toast.success("Ordem das questões salva com sucesso!");
      },
    });
  };

  if (isLoading) {
    return <div className="text-center py-12">Carregando questões...</div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-medium">Ordem das Questões</h3>
        <Button onClick={submit} disabled={reorderMutation.isPending}>
          {reorderMutation.isPending ? "Salvando..." : "Salvar Ordem"}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Arraste e solte as questões para definir a ordem de exibição. A nova
        sequência será salva ao clicar em "Salvar Ordem".
      </p>

      {orderedQuestions.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-gray-500">Não há questões para ordenar.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedQuestions.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {orderedQuestions.map((question, index) => (
                <SortableItem
                  key={question.id}
                  id={question.id}
                  question={question}
                  index={index}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

interface SortableItemProps {
  id: string;
  question: any;
  index: number;
}

function SortableItem({ id, question, index }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center p-3 border rounded-md ${
        isDragging ? "bg-muted border-primary shadow-md" : "bg-white"
      }`}
    >
      <div
        className="mr-3 text-muted-foreground cursor-grab"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </div>
      <div className="flex-1">
        <span className="font-medium mr-2">{index + 1} -</span>
        {question.title || "Questão sem título"}
      </div>
    </div>
  );
}
