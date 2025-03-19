import { anual_avaliation_schema } from '@/schemas'
import { FormType } from '@/types/form'

import { anual_avaliation } from './anual_avaliation'

export const database: Record<string, FormType<typeof anual_avaliation_schema>> = {
  anual_avaliation: {
    title: 'Avaliação Institucional',
    data: anual_avaliation,
    schema: anual_avaliation_schema
  }
}
