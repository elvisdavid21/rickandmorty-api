import { useEffect, useMemo, useState } from "react"
import { useAppStore } from "../stores/useAppStore"
import CharacterDetail from "../components/CharacterDetail"
import SearchCharacters from '../components/SearchCharacters'

function IndexPage() {

    const fetchCharactes = useAppStore(state => state.fetchCharactes)
    const characters = useAppStore(state => state.characters)
    const searchCharacter = useAppStore(state => state.searchCharacter)

    const diplay = useMemo(() => searchCharacter.length === 0,[searchCharacter])
    
    //state para avanzar o retoceder el numero de página de characters
    const [page, setPage] = useState(1)
    
    function nextPage() {
        if(page < 42) {
            setPage(page+1)
        }
    }
    
    function previousPage() {
        if(page > 1) {
            setPage(page-1)
        }
    }

    //carga todos los characters de la API
    useEffect(() => {
        fetchCharactes(page)
    }, [page])
    
  return (
    <>
        <div className="flex justify-between">
            <h1 className="text-4xl font-black px-5 mb-8">Listado de personajes</h1>
            <p className="text-4xl font-black px-5 mb-8">Pag: {page}/42</p>
        </div>
        <div className="container mx-auto px-5 gap-8 justify-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {diplay ? (
                characters.map(character => (
                    <CharacterDetail 
                        key={character.id}
                        character={character}
                    />
                ))
            ) : (
                searchCharacter.map(character => (
                    <SearchCharacters
                    key={character.id}
                    character={character}
                    />
                ))
            )}
            
        </div>
        {diplay && (
            <div className="container mx-auto mt-16 w-1/2 md:w-2/3 flex justify-items-center items-center flex-col md:flex-row gap-10">
                <button
                onClick={previousPage}
                    className="bg-cyan-600 hover:bg-cyan-700 p-2 text-white text-2xl font-bold uppercase rounded-lg w-full"
                >Atras</button>
                <button
                onClick={nextPage}
                    className="bg-green-600 hover:bg-green-700 p-2 text-white text-2xl font-bold uppercase rounded-lg w-full"
                >Avanzar</button>
            </div>
        )}
    </>
        
  )
}

export default IndexPage