import Image from 'next/image';
import React, { useState } from 'react';
import { WizardContextProvider } from '~/context/WizardContext';
import { type VegetableType } from '~/lib/scheme/vegetables';
import emptySectionPicture from "../../public/empty.png";
import { MonPotagerItems } from './PotagerGallery';
import { getPotager } from './VegetableSheet';
import { WizardHomeModal } from './WizardHomeModal';

const HomeRender = () => {
    const [isPotagerEmpty, setIsPotagerEmpty] = useState<boolean>(!(Object.values(getPotager()).length > 1));
    // const potager = getPotager();
    // useEffect(()=>{
    // // setIsPotagerEmpty(!(Object.values(getPotager()).length > 1));
    // setIsPotagerEmpty(true);
    // },[potager]);
    const [showModal, setShowModal] = useState(false);
    return (
      <>
    <WizardHomeModal showModal={showModal} setShowModal={setShowModal} setIsPotagerEmpty={setIsPotagerEmpty}/>
          {/* <Image className="absolute w-[65%] sm:max-w-[450px]" alt="empty" src={emptySection1}/>
          <Image className="absolute mt-8 ml-[40%] w-[65%] sm:max-w-[450px]" alt="empty" src={emptySection2}/>
          <Image className="absolute mr-[25%] w-[65%] sm:max-w-[450px]" alt="empty" src={emptySection3}/> */}
          {isPotagerEmpty ?
          <>
          <Image className="object-cover w-[65%] sm:max-w-[450px]" alt="empty" src={emptySectionPicture}/>
            <h1 className="font-bold text-dark leading-none text-[2rem] sm:text-[4rem]">
              Votre <span className="text-primary">Potager</span> est vide pour le 
              moment, commencez à semer 
              dès maintenant !
            </h1>
                <p className="text-lg font-medium text-dark__bg">
                Bienvenue sur le tableau de bord, à vous de l’organiser comme bon vous semble. Vous pouvez choisir de commencer par ajouter des tâches à votre Bloc-notes, générer votre calendrier du potager personnalisé via l’assistant ou bien encore ajouter vos plantes potagères favorites.
                </p>
  
                <button onClick={() => setShowModal(true)} className="active:scale-90 w-80 sm:w-52 h-12 mr-0 sm:mr-4 lg:mr-6 mb-2 sm:mb-0 inline-block px-4 py-3
              text-sm font-semibold text-center
              text-primary__variant transition
              duration-200 ease-in-out bg-primary
              rounded-md cursor-pointer
              hover:bg-primary__darker">
                Commencer</button>
          </>
                : <MonPotagerItems />
          }
          </>);
  };

export const MonPotager = ({vegetables}: {vegetables: VegetableType[]}) => {
  return (
    <WizardContextProvider values={vegetables}>
        <HomeRender />
      </WizardContextProvider>
  );
};
