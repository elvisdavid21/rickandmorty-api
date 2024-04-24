import { create } from 'zustand'
import { createCharactersSlice, CharactersSliceType } from './characterSlice'
import { addFavoritesCharacter, FavoritesSliceType } from '../stores/favoritesSlice'

export const useAppStore = create<CharactersSliceType & FavoritesSliceType>((...a) => ({
    ...createCharactersSlice(...a),
    ...addFavoritesCharacter(...a)
}))