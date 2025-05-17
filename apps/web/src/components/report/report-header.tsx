import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

type ReportHeaderProps = {
  title: string
  totalResponses: number
}

export function ReportHeader({ title, totalResponses }: ReportHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      </div>
      <Badge variant="outline" className="px-3 py-1 text-sm">
        <FileText className="mr-1 h-4 w-4" />
        {totalResponses} {totalResponses === 1 ? "resposta" : "respostas"} totais
      </Badge>
    </div>
  )
}
