import * as Yup from 'yup';

import { REQUIRED_FIELD } from '@/constants';

export const eventFormSchema = Yup.object().shape({
  title: Yup.string().required(REQUIRED_FIELD),
  description: Yup.string().required(REQUIRED_FIELD),
  courses: Yup.array().required(REQUIRED_FIELD),
  responsible: Yup.string().required(REQUIRED_FIELD),
  startDate: Yup.date().required('Preencha a data inicial'),
  endDate: Yup.date().required('Preencha a data final'),
  form: Yup.string().required(REQUIRED_FIELD),
});
