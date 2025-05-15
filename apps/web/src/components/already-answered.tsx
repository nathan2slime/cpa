"use client";

import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AlreadyAnswered = () => {
  return (
    <div className="py-10 flex justify-center">
      <Card className="max-w-xl w-full text-center border border-t-8 border-t-primary">
        <CardHeader>
          <CardTitle className="text-2xl text-start">
            Você já respondeu este formulário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-start">
            <AlertTitle className="text-base font-semibold">
              Respostas enviadas
            </AlertTitle>
            <AlertDescription>
              Suas respostas foram registradas com sucesso. Caso achar que é um
              erro, entre em contato com o administrador do formulário.
            </AlertDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlreadyAnswered;
