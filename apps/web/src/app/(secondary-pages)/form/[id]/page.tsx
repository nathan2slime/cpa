"use client";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, FileText, ListChecks, Plus, Loader2 } from "lucide-react";
import { useQuestionManager } from "@/hooks/use-question-manager";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams } from "next/navigation";
import { QuestionItem } from "@/components/question-item";

export default function QuestionForm() {
  const { id: formId } = useParams() as { id: string };

  const { questions, loading, error, fetchQuestions, createQuestion, form } =
    useQuestionManager({ formId });

  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleCreateQuestion = async (type: "TEXT" | "CHOOSE") => {
    setIsCreating(true);
    await createQuestion(type);
    setIsCreating(false);
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{form?.title}</CardTitle>
          <CardDescription>
            Crie e gerencie questões para seu formulário. Você pode adicionar
            questões de texto ou de múltipla escolha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="questions">Questões</TabsTrigger>
              <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
            </TabsList>

            <TabsContent value="questions">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">
                  {questions.length}{" "}
                  {questions.length === 1 ? "Questão" : "Questões"}
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleCreateQuestion("TEXT")}
                    disabled={isCreating || loading}
                  >
                    {isCreating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="mr-2 h-4 w-4" />
                    )}
                    Adicionar Texto
                  </Button>
                  <Button
                    onClick={() => handleCreateQuestion("CHOOSE")}
                    disabled={isCreating || loading}
                  >
                    {isCreating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ListChecks className="mr-2 h-4 w-4" />
                    )}
                    Adicionar Escolha
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : questions.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <div className="flex justify-center">
                    <Plus className="h-12 w-12 text-gray-300" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Nenhuma questão
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Comece adicionando uma questão de texto ou escolha.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-350px)]">
                  {questions.map((question, index) => (
                    <QuestionItem
                      formId={formId}
                      key={question.id}
                      id={question.id}
                      title={question.title}
                      type={question.type as "TEXT" | "CHOOSE"}
                      index={index + 1}
                      onRefresh={fetchQuestions}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="preview">
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
                      <div
                        key={question.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gray-100 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <h4 className="font-medium">{question.title}</h4>
                        </div>

                        {question.type === "TEXT" ? (
                          <Textarea
                            placeholder="Digite sua resposta aqui..."
                            className="mt-2 ml-8"
                          />
                        ) : (
                          <div className="ml-8 mt-2 space-y-2">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={`option-${index}-1`}
                                name={`question-${index}`}
                                className="mr-2"
                              />
                              <label htmlFor={`option-${index}-1`}>
                                Opção 1
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={`option-${index}-2`}
                                name={`question-${index}`}
                                className="mr-2"
                              />
                              <label htmlFor={`option-${index}-2`}>
                                Opção 2
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="pt-4">
                      <Button>Enviar Respostas</Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
