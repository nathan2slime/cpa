"use client";

import UsersCsvUpload from "@/components/users-csv-upload";

const ConfigsPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <UsersCsvUpload />
    </div>
  );
};

export default ConfigsPage;
