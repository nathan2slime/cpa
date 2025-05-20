import React from "react";

type Props = {
  children: React.ReactNode;
};

export const FiltersContent = ({ children }: Props) => {
  return <div className="flex flex-col w-full gap-2">{children}</div>;
};
