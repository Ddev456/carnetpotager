import React, { type Dispatch, type SetStateAction } from 'react';
import Modal from './Modal';
import WizardPicture from '../../public/calendar__wizard.png';
import Image from 'next/image';
import { SelectionStep } from './Wizard/Form/SelectionStep';

export const WizardHomeModal = ({showModal, setShowModal, setIsPotagerEmpty}: {showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>, setIsPotagerEmpty: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="h-[90%] rounded-xl shadow-xl flex flex-col items-center px-8 py-8 bg-dark text-grayscale">
                <h3 className='font-extrabold relative'>Assitant potager</h3>
                <Image className="absolute object-cover w-[20%] ml-[25%] sm:max-w-[140px]" alt="empty" src={WizardPicture}/>
                <p className='font-semibold'>Laissez vous guider par l’assistant pour générer votre potager, votre calendrier ...</p>
                <SelectionStep />
                <button
          className="mt-10 text-gray font-bold bg-primary hover:bg-gradient-to-br 
          focus:outline-none rounded-lg px-5 py-2.5 text-center mr-2 mb-2 border-none"
          onClick={() => { 
            setShowModal(false); setIsPotagerEmpty(false);
          }
        }
        >
          Valider
        </button>
        </div>
    </Modal>
  );
};
