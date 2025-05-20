import type { Question } from "@/types/report.type";

type ChartDataProps = {
  question: Question;
};

export function ChartData({ question }: ChartDataProps) {
  const renderChartData = () => {
    const optionCountMap: Record<string, number> = {};
    question.options.forEach((option) => {
      optionCountMap[option.id] = 0;
    });

    question.questionAnswer.forEach((answer) => {
      if (answer.questionOptionId) {
        optionCountMap[answer.questionOptionId] =
          (optionCountMap[answer.questionOptionId] || 0) + 1;
      } else if (question.type === "TEXT") {
      }
    });

    const total = Object.values(optionCountMap).reduce(
      (acc, val) => acc + val,
      0
    );

    return question.options.map((option) => {
      const count = optionCountMap[option.id] || 0;
      const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
      return {
        ...option,
        count,
        percentage,
      };
    });
  };

  return (
    <div className="grid gap-2">
      {renderChartData().map((entry) => (
        <div key={entry.id} className="flex justify-between items-center">
          <span>{entry.title}</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${entry.percentage}%`,
                }}
              />
            </div>
            <span className="text-sm text-muted-foreground min-w-[80px] text-right">
              {entry.count} ({entry.percentage}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
