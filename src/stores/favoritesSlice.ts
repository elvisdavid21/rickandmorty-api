import { StateCreator } from 'zustand'
import { CharactersSliceType, createCharactersSlice } from '../stores/characterSlice'
import type { CharacterDetail } from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export type FavoritesSliceType = {
    favorites: CharacterDetail[]
    handleClickFavorite: (character : CharacterDetail ) => void
    existFavorite: (id: CharacterDetail['id']) => boolean
    loadFromStorage: () => void
} 

export const addFavoritesCharacter : StateCreator<FavoritesSliceType & CharactersSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (character) => {
        const isNewCharacter = get().existFavorite(character.id)
        if(isNewCharacter) {
            //si esta en favoritos se elimina
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.id !== character.id)
            }))
            toast.warn('Eliminado de Favoritos')
        }else {
            //si es nuevo se agrega a favoritos
            set((state) => ({
                favorites: [...state.favorites, character]
            }))
            toast.success('Agregado a Favoritos')
        }
        createCharactersSlice(set, get, api).closeModal()
        localStorage.setItem('favoritosRM', JSON.stringify(get().favorites))
    },
    existFavorite: (id) => {
        return get().favorites.some(favorite => favorite.id === id)
    },
    loadFromStorage: () => {
        const storageFavoritos = localStorage.getItem('favoritosRM')
        if(storageFavoritos) {
            set(() => ({
                favorites: JSON.parse(storageFavoritos)
            }))
        }
    }
})