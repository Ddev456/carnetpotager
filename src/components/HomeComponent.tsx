import Link from 'next/link';
import React from 'react';
import { AiOutlineCalendar} from 'react-icons/ai';
import { GiPlantSeed } from 'react-icons/gi';
import { MdFlashAuto } from 'react-icons/md';

export const HomeComponent = () => {
  return (
        <div className="flex flex-col justify-around w-full h-[40rem] p-4 text-center bg-dark__bg border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="p-1">
                <h5 className="mb-2 text-3xl font-bold text-white">Bienvenue sur Carnet Potager !</h5>
                <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Commencer dès maintenant à semer ou planter.</p>
            </div>
            <div className="h-[45%] items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <Link href="/legumotheque" className="flex justify-between w-full sm:w-[30%] text-[1.5rem] bg-gray-800 hover:bg-gray-700 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                    <GiPlantSeed />
                    <div className="text-left">
                        <div className="mb-1 text-xs">Découvrir la</div>
                        <div className="-mt-1 font-sans text-lg font-semibold">Légumothèque</div>
                    </div>
                </Link>
                <Link href="/calendrier" className="flex justify-between w-full sm:w-[30%] text-[1.5rem] bg-gray-800 hover:bg-gray-700 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                    <AiOutlineCalendar />
                    <div className="text-left">
                        <div className="mb-1 text-xs">Accèder au</div>
                        <div className="-mt-1 font-sans text-lg font-semibold">Calendrier</div>
                    </div>
                </Link>
            </div>
            <div className="p-1">
                <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Laissez-vous guider par l'assistant.</p>
            </div>
            <div className="h-[45%] items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <Link href="/calendrier" className="w-full sm:w-[35%] relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-amber-600 to-orange-400 group-hover:from-amber-600 group-hover:to-orange-400 hover:text-white">
                <span className="flex items-center justify-between w-full relative px-5 py-4 transition-all ease-in duration-75 bg-dark__bg rounded-md group-hover:bg-opacity-0 text-[1.5rem] text-white hover:text-white">
                    <MdFlashAuto />
                    <div className="text-left">
                        <div className="mb-1">Assistant Potager</div>
                    </div>
                </span>
                </Link>
            </div>
        </div>
  );
};
