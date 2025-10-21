"use client";

import { AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  status: number;
};

const FormErrorMessage = ({ status }: Props) => {
  const statusText = {
    403: {
      title: "Acesso negado",
      description:
        "Você não tem permissão para responder a este formulário. Se você acredita que isso é um erro, entre em contato com o administrador do formulário.",
    },
    404: {
      title: "Formulário não encontrado",
      description:
        "O formulário que você está tentando acessar não existe ou foi removido.",
    },
    409: {
      title: "Formulário já respondido",
      description:
        "Nossas informações indicam que você já respondeu a este formulário. Se isso não for verdade, entre em contato com o administrador.",
    },
    423: {
      title: "Evento indisponível",
      description:
        "O evento que você está tentando acessar não está disponível no momento. Por favor, tente novamente mais tarde.",
    },
  };

  const defaultError = {
    title: "Erro desconhecido",
    description:
      "Ocorreu um erro inesperado ao acessar o formulário. Tente novamente mais tarde ou entre em contato com o suporte.",
  };

  const error = statusText[status as 403 | 404 | 409 | 423] || defaultError;

  return (
    <div className="py-10 flex justify-center">
      <Card className="max-w-xl w-full text-center border border-t-8 border-t-primary">
        <CardHeader className="py-3">
          <CardTitle className="text-2xl text-start">{error.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-start">
            <AlertDescription>{error.description}</AlertDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormErrorMessage;
