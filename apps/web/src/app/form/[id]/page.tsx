"use client"

//import { Form } from '@/components/form';
import CadasterForm from "@/components/CadasterForm/CadasterForm";
import Questionaire from "@/components/Questionare/Questioanre";
import { useState } from "react";

const FormPage = () => {

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
