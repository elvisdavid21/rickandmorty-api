import { useAppStore } from '../stores/useAppStore'
import type { Character } from '../types'

type SearchCharactersProps = {
    character: Character
}

function SearchCharacters({character} : SearchCharactersProps) {

    const handleClick = useAppStore(state => state.handleClick)

  return (
    <button
        onClick={() => handleClick(character.id)}
    >
        <div className='bg-yellow-400 p-4 rounded-lg hover:opacity-80 shadow-lg '>
            <div className='overflow-hidden'>
                <img 
                    className='w-60 rounded-lg hover:scale-125 transition-transform hover:rotate-2'
                    src={character.image} alt={character.name} 
                />
            </div>
            <h2 className='bg-cyan-400 mt-2 rounded-lg text-center text-white font-semibold '>{character.name}</h2>
        </div>
    </button>
  )
}

export default SearchCharacters