import React, { type Dispatch, type SetStateAction } from 'react';
import Modal from './Modal';
import WizardPicture from '../../public/calendar__wizard.png';
import Image from 'next/image';
import { WizardStepper } from './Wizard/WizardStepper';

export const WizardModal = ({showModal, setShowModal}: {showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="h-[90%] rounded-xl shadow-xl flex flex-col items-center px-8 py-8 bg-dark text-grayscale">
                <h3 className='font-extrabold relative'>Assitant potager - Calendrier</h3>
                <p className='font-semibold'>Laissez vous guider par l’assistant pour générer votre potager, votre calendrier ...</p>
                <WizardStepper setShowModal={setShowModal} />
                <Image className="absolute right-0 object-cover w-[20%] ml-[25%] sm:max-w-[140px]" alt="empty" src={WizardPicture}/>
        </div>
    </Modal>
  );
};
