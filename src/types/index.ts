import { z } from 'zod'
import { characterSchema, characterDetailSchema } from '../utils/characters-shema'

export type Character = z.infer<typeof characterSchema>
export type CharacterDetail = z.infer<typeof characterDetailSchema>

export type Search = {
    name: string,
    status: string
}