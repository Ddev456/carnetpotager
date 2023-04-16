import Image from 'next/image';
import React, { useState, type PropsWithChildren } from 'react';
// import { type PlantType } from '~/lib/scheme/plants';
import { AiFillStar, AiOutlinePlusSquare } from 'react-icons/ai';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCalendar, AiFillCheckSquare} from 'react-icons/ai';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { FaSeedling } from 'react-icons/fa';
import { type Plants } from '@prisma/client';
import { toast, Toaster } from 'react-hot-toast';

type VegetableSheetProps = {
    vegetable: Plants;
    accordionItemId: number;
}


type AccordionItemProps = {
  children: JSX.Element;
  value: string;
}

const AccordionItem = ({ children, value, ...props }: PropsWithChildren<AccordionItemProps>) => (
  <Accordion.Item
    className={
      'px-4 w-full mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b'
    }
    value={value}
    {...props}
  >
    {children}
  </Accordion.Item>
);

type AccordionTriggerProps = {
  children: JSX.Element
}

const notification = (plant: Plants) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white rounded-lg pointer-events-auto flex`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={plant.thumbnail ?? ''}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {plant.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              ajouté au potager !
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Fermer
        </button>
      </div>
    </div>
  ));
};

const AccordionTrigger = ({ children, ...props }: PropsWithChildren<AccordionTriggerProps>) => (
  <Accordion.Header className="flex mx-2">
    <Accordion.Trigger
      className={
        'flex h-[45px] flex-1 cursor-default items-center justify-between text-[15px] leading-none outline-none rounded-full mb-[1rem] text-dark hover:bg-gray-100'
      }
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="text-ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
);

type AccordionContentProps = {
  children: JSX.Element
}

const AccordionContent = ({ children, ...props }: PropsWithChildren<AccordionContentProps>) => (
  <Accordion.Content
    className={
      'bg-gray-700 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]'
    }
    {...props}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
);

type Selection = { [propKey: string]: {vegetable: object, selected: boolean}};

export const getPotager = (): object => {
  if (typeof window !== 'undefined') {
  const selectionsStorage = JSON.parse(localStorage.getItem("selection") ?? JSON.stringify({"selection1":{vegetable:{id: 1, name: 'Tomate', thumbnail: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));
  return selectionsStorage;
}else{
  return JSON.parse(JSON.stringify({"selection1":{vegetable:{name: 'Tomate', thumbnail: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));
}
};

export const handlePotager = (id: string, vegetable: Plants): Selection => {
  const keyOfLocalStorage = `selection${id}` as string;
  const selectionsStorage = JSON.parse(localStorage.getItem("selection") ?? JSON.stringify({"selection1":{vegetable:{id: 1, name: 'Tomate', thumbnail: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));

  const isExist = selectionsStorage[keyOfLocalStorage] ? true : false; 
  if(isExist){
    const isSelected = selectionsStorage[keyOfLocalStorage].selected === true;
      if(isSelected){ 
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete selectionsStorage[keyOfLocalStorage];
      localStorage.setItem("selection", JSON.stringify(selectionsStorage));
      return selectionsStorage;
      }else{
        selectionsStorage[keyOfLocalStorage].selected = true;
        localStorage.setItem("selection", JSON.stringify(selectionsStorage));
        return selectionsStorage;
      }
  }else{
    selectionsStorage[keyOfLocalStorage] = { vegetable: vegetable, selected: true };
    localStorage.setItem("selection", JSON.stringify(selectionsStorage));
    return selectionsStorage;
  }
};

export const VegetableSheet = ({vegetable, accordionItemId}: VegetableSheetProps) => {

  const keySelectionOfLs = `selection${vegetable.id}` as string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selection, setSelection] = useState<Selection>({});

    return (
      <>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
     <AccordionItem value={accordionItemId.toString()}>
            <>
            <AccordionTrigger>
            <div className='overflow-hidden relative w-full h-full rounded-lg'>
              
                <div className="h-full flex justify-between items-center">
                  
                <div className="flex w-[5rem] items-center text-base font-semibold">{vegetable.thumbnail ?
                <Image className="w-[2rem] h-[2rem] rounded-full" src={vegetable.thumbnail} width={80} height={80} alt="tomate" />
                : null }
                <p className='ml-1'>{vegetable.name}</p>
                </div>
                  
                      <div className="w-[5rem] lg:flex hidden text-base font-medium">
                        {vegetable.category}
                      </div>

                      <div className="w-[5rem] lg:flex hidden text-base font-medium">
                        {vegetable.family}
                      </div>

                      <div className="w-[5rem] lg:flex hidden text-base font-medium">
                        fiche n° {vegetable.id}
                      </div>
                {vegetable.level ?
                  <div className="flex items-center">
                          <AiFillStar className={vegetable.level >= 1 ? "text-primary" : ""}/><AiFillStar className={vegetable.level >= 2 ? "text-primary" : ""} /><AiFillStar className={vegetable.level === 3 ? "text-primary" : ""} />
                  </div>
                      : null }
                  
                  <div className="flex items-center mr-4">
                  { !Object.keys(getPotager()).includes(keySelectionOfLs) ?
                        <AiOutlinePlusSquare onClick={() => {
                          notification(vegetable);
                          setSelection(handlePotager(vegetable.id.toString(), vegetable));
                        }
                        } className='hover:scale-125 transitions-transform text-[1.5rem]'/>
                        :
                        <AiFillCheckSquare onClick={() => setSelection(handlePotager(vegetable.id.toString(), vegetable))} className='hover:scale-125 transitions-transform text-[1.5rem] text-green-500'/>
                  }
                          </div>
                </div>
            </div>
            </AccordionTrigger>
            <AccordionContent>

              <div className='grid grid-rows-2 grid-cols-2'>
              <div className='mb-4 px-1 border-l-2 col-span-1'>
                <h3 className='flex text-white font-bold items-center'><AiOutlineCheckCircle className='text-xl'/> Caractéristiques de la plante</h3>
                <ul className="flex flex-col">
                <li className='m-2'><span className='mr-1'>Exposition : </span>{vegetable.exposition}</li>
                <li className='m-2'><span className='mr-1'>Récolte : </span>{vegetable.harvest} jours</li>
                <li className='m-2'><span className='mr-1'>Rusticité : </span>{vegetable.isHardiness ? "Résiste au gel" : "Ne résiste pas au gel"}</li>
                </ul>
              </div>
              <div className='mb-4 px-1 border-l-2 col-span-1'>
                <h3 className='flex text-white font-bold items-center'><AiOutlineInfoCircle className='text-xl'/> Infos en vrac</h3>
                <ul className="flex flex-col">
                <li className='m-2'><span className='mr-1'></span></li>
                <li className='m-2'><span className='mr-1'></span></li>
                </ul>
              </div>
              <div className='px-1 border-l-2 col-span-1'>
                <h3 className='flex text-white font-bold items-center'><FaSeedling className='text-xl'/> Semis</h3>
                <ul className="flex flex-col">
                <li className='m-2'><span className='mr-1'>Espace entre les plantes : </span>{vegetable.spaceBetween} cm</li>
                <li className='m-2'><span className='mr-1'>Espace des rangs : </span>{vegetable.spaceOnRow} cm</li>
                <li className='m-2'><span className='mr-1'>Profondeur du semis : </span>{vegetable.seedDepth} cm</li>
                </ul>
              </div>
              <div className='px-1 border-l-2 col-span-1'>
                <h3 className='flex text-white font-bold items-center'><AiOutlineCalendar className='text-xl'/> Périodes clefs</h3>
                <ul className="flex flex-col">
                <li className='m-2'><span className='mr-1'>Semis sous abri : </span>{vegetable.seedling}</li>
                <li className='m-2'><span className='mr-1'>Semis extérieur : </span>{vegetable.nursery}</li>
                <li className='m-2'><span className='mr-1'>Plantation : </span>{vegetable.plantation}</li>
                <li className='m-2'><span className='mr-1'>Floraison : </span>{vegetable.flowering}</li>
                </ul>
              </div>
            </div>
            </AccordionContent>
            </>
          </AccordionItem>
          </>
  );
};
