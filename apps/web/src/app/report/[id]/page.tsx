"use server"

import { getAnswerQuery } from "../../../../api/queries/get-answer-query";

type Param = {
  params: Promise<{ id: string }>;
};

const ReportPage = async ({ params }: Param) => {
  const { id } = await params;

  const data = await getAnswerQuery(id);

  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  }

  return <div></div>;
};

export default ReportPage;
