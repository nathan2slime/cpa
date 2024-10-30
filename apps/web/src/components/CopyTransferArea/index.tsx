import toast from 'react-hot-toast';

export const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copiado!")
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
};