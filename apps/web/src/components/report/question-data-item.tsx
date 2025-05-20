"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, MessageSquare } from "lucide-react"
import type { Question } from "@/types/report.type"
import { ChartData } from "@/components/report/chart-data"
import { TextResponses } from "@/components/report/text-responses"
import * as htmlToImage from "html-to-image"

type QuestionDataItemProps = {
  question: Question
  setRef: (el: HTMLDivElement | null) => void
}

export function QuestionDataItem({ question, setRef }: QuestionDataItemProps) {
  const handleDownload = async () => {
    const element = document.getElementById(`question-${question.id}`)
    if (!element) return

    const clone = element.cloneNode(true) as HTMLElement

    clone.style.padding = "1rem"
    clone.style.backgroundColor = "#ffffff"
    clone.style.width = `${element.offsetWidth}px`

    const wrapper = document.createElement("div")
    wrapper.style.position = "fixed"
    wrapper.style.top = "-10000px"
    wrapper.style.left = "-10000px"
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)

    try {
      const dataUrl = await htmlToImage.toPng(clone, {
        cacheBust: true,
        backgroundColor: "#fff",
      })
      const link = document.createElement("a")
      link.download = `dados-brutos-${question.id}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Erro ao gerar imagem:", error)
    } finally {
      document.body.removeChild(wrapper)
    }
  }

  const hasChartData = question.type === "CHOOSE" || question.type === "CHOOSE_AND_TEXT"
  const hasTextData = question.type === "TEXT" || question.type === "CHOOSE_AND_TEXT"

  return (
    <div id={`question-${question.id}`} className="space-y-4" ref={setRef}>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">{question.title}</h3>
          {hasTextData && (
            <Badge variant="outline" className="bg-muted">
              <MessageSquare className="h-3 w-3 mr-1" />
              Questão com texto
            </Badge>
          )}
        </div>
        {hasChartData && (
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-1" />
            Baixar imagem
          </Button>
        )}
      </div>

      {hasChartData && <ChartData question={question} />}

      {hasTextData && <TextResponses question={question} />}
    </div>
  )
}
