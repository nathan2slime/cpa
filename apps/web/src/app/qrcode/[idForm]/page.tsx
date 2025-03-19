'use client'
import { NewQRCode } from '@/components/GenerateQRCode'
import { useParams } from 'next/navigation'

const QRCode = () => {
  const params = useParams()
  const host = window.location.origin

  if (params.idForm !== 'avaliacao-institucional') {
    return <h1>&copy; ak 404</h1>
  }

  return (
    <div className="h-screen m-auto bg-gray-200 grid place-items-center">
      <div className="bg-white border-border text-md p-4 rounded-lg shadow-none">
        <h1>Unifacema - Avaliação</h1>
        <NewQRCode text={`${host}/form/${params.idForm}`} />
      </div>
    </div>
  )
}
export default QRCode
