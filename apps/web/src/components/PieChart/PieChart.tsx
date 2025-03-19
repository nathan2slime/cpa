import React from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const convertData = (data: Record<string, string>[]) => {
  return data.flatMap(item => {
    const name = item.name
    const responses = Object.entries(item).slice(1)
    return responses.map(([key, value]) => ({
      questao: name,
      name: key,
      value: value
    }))
  })
}

const MyPieChart = ({ data }): React.JSX.Element => {
  if (!data) {
    return <div>Sem dados no momento.</div>
  }

  const chartData = convertData(data)
  console.log(chartData)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default MyPieChart
