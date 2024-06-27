import {z} from 'zod'

export const BookSchema = z.object({
    id: z.number().int().optional(),
    title: z.string(),
    author: z.string(),
    year: z.number(),

})