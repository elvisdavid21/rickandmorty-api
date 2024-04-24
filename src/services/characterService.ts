import { charactersSchema, characterDetailSchema } from "../utils/characters-shema"
import type { Character, Search } from '../types'
import axios from "axios"

export async function getCharacters(pageNum : number) {
    const url = `https://rickandmortyapi.com/api/character?page=${pageNum}`
    const  {data}  = await axios(url)
    const result = charactersSchema.safeParse(data.results)
    if(result.success) {
        return result.data
    }else {
        console.log(result.error)
    }
}

export async function getCharacterById(id : Character['id']) {
    const url = `https://rickandmortyapi.com/api/character/${id}`
    const { data } = await axios(url)
    const result = characterDetailSchema.safeParse(data)
    if(result.success) {
        return result.data
    }else {
        console.log(result.error)
    }
}

export async function getCharactersBySearch(search : Search) {
    const url = `https://rickandmortyapi.com/api/character/?name=${search.name}&status=${search.status}`
    const {data}  = await axios(url)
    const result = charactersSchema.safeParse(data.results)
    if(result.success) {
        return result.data
    }else {
        throw new Error('No encontrado')
    } 
}