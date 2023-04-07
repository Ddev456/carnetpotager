import React, { type Dispatch, type SetStateAction } from 'react';
import Modal from './Modal';
import WizardPicture from '../../public/calendar__wizard.png';
import Image from 'next/image';
import { WizardStepper } from './Wizard/WizardStepper';

export const WizardModal = ({showModal, setShowModal}: {showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="h-[90%] rounded-xl shadow-xl flex flex-col items-center px-8 py-8 bg-dark text-grayscale">
            <Image className="object-cover w-[20%] sm:max-w-[320px]" alt="empty" src={WizardPicture}/>
            <div className="flex flex-col">
                <h3 className='font-extrabold mx-auto'>Assitant potager</h3>
                <p className='font-semibold mx-[4rem]'>Laissez vous guider par l’assistant pour générer votre potager, votre calendrier ...</p>
                <WizardStepper setShowModal={setShowModal} />
            </div>
        </div>
    </Modal>
  );
};
