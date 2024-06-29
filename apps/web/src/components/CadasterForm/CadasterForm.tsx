// src/app/components/CadasterForm.tsx

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { dataCampus } from '@/database/campus';

const CadasterForm = ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [campus, setCampus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('CPF:', cpf);
    console.log('Nome:', nome);
    console.log('Campus:', campus);
    onSubmitSuccess(); // Chama a função de callback ao enviar o formulário com sucesso
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Unifacema - Login</CardTitle>
          <CardDescription>Preencha os campos abaixo para responder a avaliação.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="apenas números"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nome">Data de Nascimento</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="apenas números"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Select
                  value={campus}
                  onValueChange={(value) => setCampus(value)}
                >
                  <SelectTrigger id="campus" className="flex w-full justify-between bg-gray-200 rounded-md">
                    <SelectValue placeholder="Campus Universitário" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataCampus.map((campus) => (
                      <SelectItem key={campus} value={campus}>
                        {campus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" variant="ghost"
              className="bg-green-600 hover:bg-green-400"

              disabled={!nome || !cpf || !campus}
            >Continuar</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CadasterForm;

// TODO: Implementar a lógica de envio do formulário
// TODO: Validação dos campos
// TODO: Usar react-hook-form para gerenciar o estado do formulário e a validacao (opcional)
// TODO: Adicionar feedback visual ao enviar o formulário
