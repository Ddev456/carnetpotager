import Image from 'next/image';
import React, { useEffect, useState, type PropsWithChildren } from 'react';
import { type VegetableType } from '~/lib/scheme/vegetables';
import { AiFillStar, AiOutlineHeart, AiOutlinePlusSquare } from 'react-icons/ai';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCalendar, AiFillHeart, AiFillCheckSquare} from 'react-icons/ai';
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
  const selectionsStorage = JSON.parse(localStorage.getItem("selection") ?? JSON.stringify({"selection1":{vegetable:{id: 1, name: 'Tomate', icon: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));
  return selectionsStorage;
}else{
  return JSON.parse(JSON.stringify({"selection1":{vegetable:{name: 'Tomate', icon: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));
}
};

export const handlePotager = (id: string, vegetable: VegetableType): Selection => {
  const keyOfLocalStorage = `selection${id}` as string;
  const selectionsStorage = JSON.parse(localStorage.getItem("selection") ?? JSON.stringify({"selection1":{vegetable:{id: 1, name: 'Tomate', icon: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));

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
  type Fav = { [propKey: string]: {name: string, favorites: boolean}};
  
  const keyOfLs = `vegetable${vegetable.id}` as string;
  const keySelectionOfLs = `selection${vegetable.id}` as string;

  const [favorites, setFavorites] = useState<Fav>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selection, setSelection] = useState<Selection>({});
  
  useEffect(()=>{
    const favoritesStorage = JSON.parse(localStorage.getItem("favorites") ?? JSON.stringify({"selection1":{vegetable:{id: 1, name: 'Tomate', icon: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));
    setFavorites(favoritesStorage);
    localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
  },[]);
  
  const handleFavorites = (id: string, name: string) => {
    const keyOfLocalStorage = `vegetable${id}` as string;
    const favoritesStorage = JSON.parse(localStorage.getItem("favorites") ?? JSON.stringify({"selection1":{vegetable:{id: 1, name: 'Tomate', icon: 'https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg'}, selected: true}}));

    const isExist = favoritesStorage[keyOfLocalStorage] ? true : false; 
    if(isExist){
      const isFavorites = favoritesStorage[keyOfLocalStorage].favorites === true;
        if(isFavorites){ 
        favoritesStorage[keyOfLocalStorage].favorites = false;
        localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
        setFavorites(favoritesStorage);
        }else{
          favoritesStorage[keyOfLocalStorage].favorites = true;
          localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
          setFavorites(favoritesStorage);
        }
    }else{
      favoritesStorage[keyOfLocalStorage] = { name: name, favorites: true };
      localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
      setFavorites(favoritesStorage);
    }
  };

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
                  { !favorites[keyOfLs]?.favorites ?
                        <AiOutlineHeart onClick={() => handleFavorites(vegetable.id.toString(), vegetable.name)} className="hover:scale-125 transitions-transform text-[1.5rem]"
                        />
                        :
                        <AiFillHeart onClick={() => handleFavorites(vegetable.id.toString(), vegetable.name)} className="hover:scale-125 transitions-transform text-[1.5rem] text-red-500"/>
                  }
                  { !Object.keys(getPotager()).includes(keySelectionOfLs) ?
                        <AiOutlinePlusSquare onClick={() => setSelection(handlePotager(vegetable.id.toString(), vegetable))} className='hover:scale-125 transitions-transform text-[1.5rem]'/>
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
