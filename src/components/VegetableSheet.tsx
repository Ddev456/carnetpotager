import Image from 'next/image';
import React, { type PropsWithChildren } from 'react';
import { type VegetableType } from '~/lib/scheme/vegetables.js';
import { AiFillStar, AiOutlineHeart, AiOutlinePlusSquare, AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCalendar } from 'react-icons/ai';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { FaSeedling } from 'react-icons/fa';

type VegetableSheetProps = {
    vegetable: VegetableType;
    accordionItemId: number;
}


type AccordionItemProps = {
  children: JSX.Element;
  value: string;
}

const AccordionItem = ({ children, value, ...props }: PropsWithChildren<AccordionItemProps>) => (
  <Accordion.Item
    className={
      'px-4 my-1 w-full mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b'
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

const AccordionTrigger = ({ children, ...props }: PropsWithChildren<AccordionTriggerProps>) => (
  <Accordion.Header className="flex mx-2">
    <Accordion.Trigger
      className={
        'flex h-[45px] flex-1 cursor-default items-center justify-between text-[15px] leading-none outline-none bg-dark__bg group hover:bg-gray-700 rounded-lg'
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
      'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]'
    }
    {...props}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
);


export const VegetableSheet = ({vegetable, accordionItemId}: VegetableSheetProps) => {
  return (
     <AccordionItem value={accordionItemId.toString()}>
            <>
            <AccordionTrigger>
            <div className='overflow-hidden relative w-full h-full rounded-lg'>
              
                <Image className="absolute -left-6 h-auto rounded-full" src={vegetable.icon} width={80} height={80} alt="tomate" />
                <div className="h-full flex justify-between ml-[60px] items-center">
                  
                      <div className="flex flex-wrap w-[5rem] text-base font-semibold">{vegetable.name}</div>
                  
                      <div className="w-[5rem] lg:flex hidden text-base font-medium">
                        {vegetable.category}
                      </div>

                      <div className="w-[5rem] lg:flex hidden text-base font-medium">
                        {vegetable.family}
                      </div>

                      <div className="w-[5rem] lg:flex hidden text-base font-medium">
                        fiche n° {vegetable.id}
                      </div>

                  <div className="flex items-center">
                          <AiFillStar className={vegetable.level >= 1 ? "text-primary" : ""}/><AiFillStar className={vegetable.level >= 2 ? "text-primary" : ""} /><AiFillStar className={vegetable.level === 3 ? "text-primary" : ""} />
                  </div>
                      
                  
                  <div className="flex items-center mr-4">
                          <AiOutlineHeart className='hover:scale-125 transitions-transform text-[1.5rem]'/>
                          <AiOutlinePlusSquare className='text-[1.5rem]'/>
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
                <li className='m-2'><span className='mr-1'>Récolte : </span>{vegetable.harvest}</li>
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
                <li className='m-2'><span className='mr-1'>Semis extérieur : </span>{vegetable.selterSeedling}</li>
                <li className='m-2'><span className='mr-1'>Plantation : </span>{vegetable.plantation}</li>
                <li className='m-2'><span className='mr-1'>Floraison : </span>{vegetable.flowering}</li>
                </ul>
              </div>
            </div>
            </AccordionContent>
            </>
          </AccordionItem>
  );
};
