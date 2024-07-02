"use client"
//import { Form } from '@/components/form';
import CadasterForm from "@/components/CadasterForm/CadasterForm";
import Questionaire from "@/components/Questionare/Questioanre";
import { useParams } from "next/navigation";
import { useState } from "react";

const FormPage = () => {

  const params = useParams()

  if (params.id !== "avaliacao-institucional") {
    return <h1>&copy; ak 404</h1>
  }

  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const handleFormSubmitSuccess = () => {
    setShowQuestionnaire(true);
  };

  return (
    <div>
      {/*<Form id="anual_avaliation" />*/}
      {!showQuestionnaire && <CadasterForm onSubmitSuccess={handleFormSubmitSuccess} />}
      {showQuestionnaire && <Questionaire />}
    </div>
  );
};

export default FormPage;
