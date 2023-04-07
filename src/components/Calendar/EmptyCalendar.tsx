import Image from 'next/image';
import React, { type Dispatch, type SetStateAction } from 'react';
import emptySectionPicture from '../../../public/empty__calendar.png';

export const EmptyCalendar = ({setShowModal}: {setShowModal: Dispatch<SetStateAction<boolean>>}) => {

  return (
    <div className="p-[3rem] h-full relative container flex flex-col justify-around items-center">
        
        <Image className="object-cover w-[65%] sm:max-w-[450px]" alt="empty" src={emptySectionPicture}/>
          <h1 className="text-xl font-bold text-dark leading-10 sm:text-[4rem]">
            Votre <span className="text-primary">Calendrier</span> est vide pour le 
            moment, commencez à le remplir 
            dès maintenant avec l'assistant !
          </h1>
              {/* <p className="text-lg font-medium text-dark__bg">
              Bienvenue sur le tableau de bord, à vous de l’organiser comme bon vous semble. Vous pouvez choisir de commencer par ajouter des tâches à votre Bloc-notes, générer votre calendrier du potager personnalisé via l’assistant ou bien encore ajouter vos plantes potagères favorites.
              </p> */}
              <button className="active:scale-90 w-80 sm:w-52 h-12 mr-0 sm:mr-4 lg:mr-6 mb-2 sm:mb-0 inline-block px-4 py-3
              text-sm font-semibold text-center
              text-primary__variant transition
              duration-200 ease-in-out bg-primary
              rounded-md cursor-pointer
              hover:bg-primary__darker"
              onClick={() => setShowModal(true)}
              >
              Commencer</button>
      </div>

  );
};
