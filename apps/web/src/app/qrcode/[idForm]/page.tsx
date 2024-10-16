'use client';

import { NewQRCode } from '@/components/GenerateQRCode';
import { useParams } from 'next/navigation';
import React from 'react';

const QRCode = () => {

  const params = useParams();
  const host = window.location.origin;

  return (
    <div className="h-screen m-auto grid place-items-center">
      <div className="bg-white border text-md p-4 rounded-lg shadow-none">
        <h1 className='text-center font-semibold'>Unifacema - Avaliação</h1>
        <NewQRCode text={`${host}/form/${params.idForm}`} />
      </div>
    </div>
  );
};
export default QRCode;
