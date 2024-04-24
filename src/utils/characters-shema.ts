import { z } from 'zod'


export const characterSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
})

export const charactersSchema = z.array(characterSchema)

export const characterDetailSchema = z.object({
    id: z.number(),
    name: z.string(),
    status: z.string(),
    species: z.string(),
    type: z.string().nullable(),
    gender: z.string(),
    image: z.string(),
    episode: z.array(z.string()).nullable(),
    location: z.object({
        name: z.string().nullable()
    }),
    origin: z.object({
        name: z.string().nullable()
    })
})
