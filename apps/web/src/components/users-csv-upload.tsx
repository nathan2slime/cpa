"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { UserImportService } from "@/services/user-import.service";

const UsersCsvUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo CSV para upload.");
      return;
    }

    setIsUploading(true);
    try {
      await UserImportService.importUsers(selectedFile);
      toast.success("Usuários importados com sucesso!");
      setSelectedFile(null);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Usuários via CSV</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="csv-file">Upload de Arquivo CSV</Label>
          <Input
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
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="mt-4"
        >
          {isUploading ? "Importando..." : "Adicionar Usuários"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UsersCsvUpload;
