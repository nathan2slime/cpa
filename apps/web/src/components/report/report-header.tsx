import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import * as XLSX from "xlsx";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type ReportHeaderProps = {
  title: string;
  totalResponses: number;
  responders: {
    name: string | null;
    surname: string | null;
    login: string;
  }[];
};

export function ReportHeader({
  title,
  totalResponses,
  responders,
}: ReportHeaderProps) {
  const handleExport = () => {
    const dataToExport = responders.map((r) => ({
      Nome: `${r.name || ""} ${r.surname || ""}`.trim() || "Sem nome",
      Matrícula: r.login,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Respondedores");
    XLSX.writeFile(
      workbook,
      `${title.replace(/[^a-z0-9]/gi, "_")}_respondedores.xlsx`
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Ver Respostas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quem respondeu</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {responders.map((responder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="font-medium">
                      {responder.name} {responder.surname}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {responder.login}
                    </div>
                  </div>
                ))}
                {responders.length === 0 && (
                  <div className="text-center text-muted-foreground">
                    Nenhuma resposta encontrada.
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Exportar Excel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Badge variant="outline" className="px-3 py-1 text-sm h-9">
          <FileText className="mr-1 h-4 w-4" />
          {totalResponses} {totalResponses === 1 ? "resposta" : "respostas"}{" "}
          totais
        </Badge>
      </div>
    </div>
  );
}
