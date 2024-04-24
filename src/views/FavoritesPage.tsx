import { useAppStore } from "../stores/useAppStore"

function FavoritesPage() {

  const favorites = useAppStore(state => state.favorites)
  const handleClickFavorite = useAppStore(state => state.handleClickFavorite)

  return (
      <>
        <h1 className=" px-4 text-4xl font-black ">Listado de Favoritos</h1>
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center items-center">
          {favorites.length ? (favorites.map(favorite => (
            <div key={favorite.id}
              className="bg-cyan-400 p-4 w-72 rounded-full relative"
            >
              <div>
                <img className="rounded-full" src={favorite.image} alt={`Imagen ${favorite.name}`} />
              </div>
              <h2 className="absolute w-40 text-center bottom-0 right-16 text-sm font-extrabold text-black bg-yellow-400 rounded-full">{favorite.name}</h2>
              <button
              onClick={() => handleClickFavorite(favorite)}
                className="w-7 h-7 flex justify-center items-center absolute top-6 right-14 bg-red-600 hover:bg-red-700 rounded-full p-1 text-white font-bold"
              >x</button>
            </div>
          ))) : <p className="text-xl text-center mt-2">Agrega a tu personaje favorito</p>}
        </div>
      </>
    
  )
}

export default FavoritesPage