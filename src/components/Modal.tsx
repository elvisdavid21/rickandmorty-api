import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';

export default function Modal() {

    const closeModal = useAppStore(state => state.closeModal)
    const modal = useAppStore(state => state.modal)
    const characterDetail = useAppStore(state => state.characterDetail)
    const existFavorite = useAppStore(state => state.existFavorite)
    const handleClickFavorite = useAppStore(state => state.handleClickFavorite)

    const numEpisode =  characterDetail.episode?.length

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                        <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center uppercase">
                            {characterDetail.name}
                        </Dialog.Title>
                        <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                            <div className='w-96 mx-auto mb-4 flex justify-center'>
                                <img className='rounded-full shadow-2xl' src={characterDetail.image} alt={`Imagen de ${characterDetail.name}`} />
                            </div>
                            <p className='uppercase'>Datos Generales:</p>
                            <div className='mt-2 px-6'>
                                <li className='text-cyan-500 uppercase text-lg'>Género: <span className='text-yellow-500 text-xl capitalize'>{characterDetail.gender}</span></li>
                                <li className='text-cyan-500 uppercase text-lg'>Especie: <span className='text-yellow-500 text-xl capitalize'>{characterDetail.species}</span></li>
                                <li className='text-cyan-500 uppercase text-lg'>Estatus: <span className='text-yellow-500 text-xl capitalize'>{characterDetail.status}</span></li>
                                <li className='text-cyan-500 uppercase text-lg'>Ubicación: <span className='text-yellow-500 text-xl capitalize'>{characterDetail.location?.name === undefined ? 'No hay datos' : characterDetail.location?.name}</span></li>
                                <li className='text-cyan-500 uppercase text-lg'>Origen: <span className='text-yellow-500 text-xl capitalize'>{characterDetail.origin?.name === undefined ? 'No hay datos' : characterDetail.origin?.name}</span></li>
                            </div>
                        </Dialog.Title>
                        <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5 uppercase">
                            Cantidad de Episodios del Personaje:
                            <div className='mt-2 text-xl px-6'>
                                <li className='text-cyan-500'>{numEpisode} <span className='text-yellow-500'>en total</span></li>
                            </div>
                        </Dialog.Title>
                        <div className='flex gap-4 flex-col md:flex-row'>
                            <button
                                className='bg-yellow-500 hover:bg-yellow-400 p-2 w-full text-white font-bold text-lg uppercase'
                                onClick={() => closeModal()}
                            >cerrar</button>
                            <button
                            onClick={() => handleClickFavorite(characterDetail)}
                                className='bg-cyan-500 hover:bg-cyan-400 p-2 w-full text-white font-bold text-lg uppercase'
                            >{existFavorite(characterDetail.id) ? 'Eliminar Favorito' : 'Guardar Favorito'}
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}