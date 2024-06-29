// src/app/components/CadasterForm.tsx

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CadasterForm = ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [matricula, setMatricula] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Nome:', nome);
        console.log('CPF:', cpf);
        console.log('Matrícula:', matricula);
        onSubmitSuccess(); // Chama a função de callback ao enviar o formulário com sucesso
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Formulário de Cadastro</CardTitle>
                    <CardDescription>Preencha os campos abaixo para se cadastrar.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nome">Nome</Label>
                                <Input
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Digite seu nome"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cpf">CPF</Label>
                                <Input
                                    id="cpf"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    placeholder="Digite seu CPF"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="matricula">Matrícula</Label>
                                <Input
                                    id="matricula"
                                    value={matricula}
                                    onChange={(e) => setMatricula(e.target.value)}
                                    placeholder="Digite sua matrícula"
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button type="submit">Enviar</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default CadasterForm;
