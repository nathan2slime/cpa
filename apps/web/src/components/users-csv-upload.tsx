"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { importUsersService } from "@/services/user-import.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UsersCsvUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteExistingUsers, setDeleteExistingUsers] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleImportConfirmation = () => {
    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo CSV para upload.");
      return;
    }

    setIsAlertOpen(true);
  };

  const handleUpload = async () => {
    setIsAlertOpen(false);

    setIsUploading(true);
    try {
      await importUsersService(selectedFile!, deleteExistingUsers);
      toast.success("Usuários importados com sucesso!");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      toast.error(
        `Erro ao importar usuários: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  const confirmationMessage = deleteExistingUsers
    ? `
    Você selecionou a opção de 'Excluir usuários existentes'.
    Atenção: Todos os usuários existentes que pertencem aos
    públicos-alvos listados no arquivo CSV serão PERMANENTEMENTE excluídos,
    juntamente com todos os seus dados e respostas no banco de dados.
    Esta ação não pode ser desfeita. Deseja prosseguir?
  `
    : `
    Você está prestes a importar novos usuários.
    Os usuários listados no arquivo CSV serão adicionados ao sistema.
    Deseja prosseguir?
  `;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Usuários via CSV</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm text-gray-600">
          <p>O arquivo CSV deve conter as seguintes colunas:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              <b>login</b>: O login do usuário (obrigatório)
            </li>
            <li>
              <b>password</b>: A senha do usuário (obrigatório)
            </li>
            <li>
              <b>name</b>: O primeiro nome do usuário (obrigatório)
            </li>
            <li>
              <b>surname</b>: O sobrenome do usuário (obrigatório)
            </li>
            <li>
              <b>targetAudience</b>: O público-alvo do usuário (obrigatório)
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="delete-users"
            checked={deleteExistingUsers}
            onCheckedChange={(checked) => setDeleteExistingUsers(!!checked)}
          />
          <Label htmlFor="delete-users">
            Excluir usuários existentes (apenas dos publicos-alvos importados)
            antes da importação
          </Label>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="csv-file">Upload de Arquivo CSV</Label>
          <Input
            ref={fileInputRef}
            id="csv-file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="text-sm text-gray-500 mt-2">
              Arquivo selecionado: {selectedFile.name}
            </p>
          )}
        </div>
        <Button
          onClick={handleImportConfirmation}
          disabled={!selectedFile || isUploading}
          className="mt-4"
        >
          {isUploading ? "Importando..." : "Adicionar Usuários"}
        </Button>
      </CardContent>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle
              className={deleteExistingUsers ? "text-red-600" : ""}
            >
              {deleteExistingUsers
                ? "ALERTA: Ação Irreversível no Banco de Dados"
                : "Confirmar Importação"}
            </AlertDialogTitle>
            <AlertDialogDescription className="whitespace-pre-wrap">
              {confirmationMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUploading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpload}
              disabled={isUploading}
              className={
                deleteExistingUsers
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-primary hover:bg-primary/90"
              }
            >
              {deleteExistingUsers
                ? "Confirmar Importação e Exclusão"
                : "Confirmar Importação"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default UsersCsvUpload;
