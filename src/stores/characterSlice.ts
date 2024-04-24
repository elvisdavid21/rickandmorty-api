import { StateCreator } from "zustand"
import { getCharacterById, getCharacters, getCharactersBySearch } from "../services/characterService"
import type { Character, CharacterDetail, Search } from '../types/index'
import { FavoritesSliceType } from '../stores/favoritesSlice'


export type CharactersSliceType = {
    characters: Character[]
    modal: boolean
    characterDetail: CharacterDetail
    search: Search
    searchCharacter: Character[]
    fetchCharactes: (pageNum: number) => Promise<void>
    handleClick: (id : Character['id']) => Promise<void>
    closeModal: () => void
    searchCharacters: (search: Search) => Promise<void>
}

export const createCharactersSlice : StateCreator<CharactersSliceType & FavoritesSliceType, [], [], CharactersSliceType> = (set) => ({
    characters: [],
    modal: false,
    closeModal: () => {
        set(() => ({
            modal: false
        }))
    },
    fetchCharactes: async (pageNum) => {
        const characters = await getCharacters(pageNum)
        set(() => ({
            characters
        }))
    },
    characterDetail: {} as CharacterDetail,
    handleClick: async (id ) => {
        const characterDetail = await getCharacterById(id)
        set(() => ({
            characterDetail,
            modal: true
        }))
    },
    search: {} as Search,
    searchCharacter: [],
    searchCharacters: async (search) => {
        const searchCharacter = await getCharactersBySearch(search)
        set(() => ({
            searchCharacter
        }))
    }
})