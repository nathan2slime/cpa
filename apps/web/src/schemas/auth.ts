import * as yup from 'yup'

import { REQUIRED_FIELD } from '@/constants'

export const authSchema = yup.object().shape({
  login: yup.string().required(REQUIRED_FIELD),
  password: yup.string().required(REQUIRED_FIELD)
})

export type AuthSchema = yup.InferType<typeof authSchema>
