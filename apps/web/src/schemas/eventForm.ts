import * as yup from 'yup'

export const eventFormSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  courses: yup.array().required('Curso é Obrigatório').min(1, 'É obrigatorio selecionar no mínimo um curso'),
  responsible: yup.string().required('Responsável é obrigatório'),
  startDate: yup.date().required('Data de início é obrigatória'),
  endDate: yup.date().required('Data de término é obrigatória'),
  form: yup.string().required('Formulário é obrigatório')
})
