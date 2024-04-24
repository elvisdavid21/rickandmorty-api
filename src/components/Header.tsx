import { useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import Error from '../components/Error'
import type { Search } from '../types'
import { useAppStore } from "../stores/useAppStore"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Header() {

    const searchCharacters = useAppStore(state => state.searchCharacters)

    const {pathname} = useLocation()

    const isHome = useMemo(() => pathname === '/',[pathname])

    const [error, setError] = useState('')

    const [search, setSearch] = useState<Search>({
        name: '',
        status: ''
    })

    //recuperar los datos del form
    const handleChance = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })   
    }

    //validar el formulario
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')) {
            setError('todos los campos son obligatorios')
            return
        }
        setError('')
        searchCharacters(search)
        toast.info('Buscando...', {
            autoClose: 1000
        })
        setSearch({
            name: '',
            status: ''
        })
    }

  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'} >
        <div className="container mx-auto px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <NavLink
                        to='/'
                    >
                        <img className="w-52 hover:opacity-40" src="/img/logo.png" alt="Imagen Logo" />
                    </NavLink>
                </div>
                <nav className="text-2xl font-bold uppercase space-x-4">
                    <NavLink 
                        to='/'
                        className={({isActive}) => isActive ? 'text-yellow-400' : 'text-white'}
                    >Inicio</NavLink>
                    <NavLink 
                        to='/favoritos'
                        className={({isActive}) => isActive ? 'text-yellow-400' : 'text-white'}
                    >Favoritos</NavLink>
                </nav>
            </div>
            {isHome && (
                <form 
                    className="md:w-1/2 2xl:w-1/3 bg-yellow-400 mt-20 p-10 rounded-lg"
                    onSubmit={handleSubmit}
                >   
                    <h2 className="text-white text-center uppercase font-black text-xl">Filtro de Busqueda</h2>
                    {error && <Error>{error}</Error>}
                    <div className="space-y-4">
                        <label htmlFor="name"
                            className="block text-white uppercase font-bold text-lg"
                        >Nombre:</label>
                        <input type="text"
                            id="name"
                            name="name" 
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Nombre personaje. Ej. Rick, Morty"
                            onChange={handleChance}
                            value={search.name}
                        />
                    </div>
                    <div className="space-y-4 mt-2">
                        <label htmlFor="status"
                            className="block text-white uppercase font-bold text-lg"
                        >Estatus:</label>
                        <select name="status" id="status"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handleChance}
                            value={search.status}
                        >
                            <option value="">--Seleccione--</option>
                            <option value="alive">Alive</option>
                            <option value="dead">Dead</option>
                            <option value="unknown">Unknown</option>
                        </select>
                    </div>
                    <input type="submit" value='Buscar'
                        className="cursor-pointer bg-cyan-500 hover:bg-cyan-400 w-full rounded-lg p-2 mt-4 text-white font-bold uppercase"
                    />
                </form>
            )}
        </div>
    </header>
  )
}

export default Header