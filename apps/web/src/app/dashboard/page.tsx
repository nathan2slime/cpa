import { CardRecentAv } from '@/components/CardRecentAv'
import GraphMain from '@/components/GrafMain'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { eventsRecents } from '@/database/eventsRecents'

export default () => {
  return (
    <main className="w-full h-full flex justify-start items-start gap-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Visão geral</CardTitle>
          <CardDescription>Formulários respondidos</CardDescription>
        </CardHeader>
        <CardContent>
          <GraphMain />
        </CardContent>
        <CardFooter>
          <Badge variant="outline">relatórios / mês</Badge>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-md h-fit">
        <CardHeader>
          <CardTitle className="text-lg">Respostas</CardTitle>
          <CardDescription>Criadas recentemente</CardDescription>
        </CardHeader>
        <CardContent>
          {eventsRecents.map((r, index) => (
            <div key={index}>
              <CardRecentAv id={index} name={r.name} description={r.description} date={r.date} />
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
