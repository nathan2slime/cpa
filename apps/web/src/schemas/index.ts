import {z} from "zod";

const required_error = 'Preencha esse campo';

export const anual_avaliation_schema = z.object({
    data: z.object({
        answer: z.number({ required_error }),
        question: z.number({ required_error })
    }).array().min(12)
});