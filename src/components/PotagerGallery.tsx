import Image from 'next/image';
import React, { useState } from 'react';
import { useWizard } from '~/context/WizardContext';
import { AiFillCheckCircle } from 'react-icons/ai';
// import { getPotager } from './VegetableSheet';
// import { type PlantType } from '~/lib/scheme/plants';
import { type Plants } from '@prisma/client';
import { usePotager } from '~/lib/usePotager';

type ElementGalleryProps = {
    item: Plants;
    isNotSelected: boolean;
}

const ElementGallery = ({item, isNotSelected}: ElementGalleryProps) => {
    const { addToSelection } = usePotager();
    const handleClick = (plantId: number, plant: Plants) => {
        addToSelection(plantId, plant);
        // const handleSelection = handlePotager(item.id.toString(), item);
        // setSelectionToDisplay(selection);
      };

    return <div onClick={() => handleClick(item.id, item)} className='hover:cursor-pointer w-[8rem] h-[8rem] relative' key={item.id}>
        {!isNotSelected ?
        <span className="bg-blue-200 font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute -translate-y-1/2 translate-x-1/2 left-auto top-0 right-0 text-[2rem]"><AiFillCheckCircle /></span>
        : null}
        {item.thumbnail ?
        <Image className="hover:opacity-75 h-auto max-w-full rounded-lg" width={120} height={120} src={item.thumbnail} alt="thumbnail" />
            : null }
    </div>;
};

export const PotagerGallery = () => {
    const { values } = useWizard();
    const [query, setQuery] = useState("");
    const selectionToLoop = values.filter((plant) =>{
        const categoryToFilter = plant.category ?? "";
        return categoryToFilter.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''));
    });
//   const selectionStorage = JSON.parse(localStorage.getItem("selection") ?? JSON.stringify({"selection1":{vegetable:{}, selected: false}}));
const { selection } = usePotager();
//   const[selectionToDisplay, setSelectionToDisplay] = useState(getPotager());
  const isNotSelected = (id: number): boolean => !selection.find(plant => plant.id == id);
//   const isSelected = (id: number): boolean => Object.keys(selectionToDisplay).some((selectItem: string) => selectItem === `selection${id}`);
    return (
    <>
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    <button type="button" onClick={() => setQuery("")} className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-base font-medium px-4 py-1.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">Tout</button>
                    <button type="button" onClick={() => setQuery("aromatique")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-base font-medium px-4 py-1.5  text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Aromatiques</button>
                    <button type="button" onClick={() => setQuery("légume")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-base font-medium px-4 py-1.5  text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Légumes</button>
                    <button type="button" onClick={() => setQuery("fruit")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-base font-medium px-4 py-1.5  text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Fruits</button>
                    <button type="button" onClick={() => setQuery("fleur")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 text-base font-medium px-4 py-1.5  text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Fleurs</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 overflow-auto">
        { selectionToLoop.map((item) => {
            return(
            <ElementGallery key={item.id} isNotSelected={isNotSelected(item.id)} item={item}/>);
        })}
        </div>  
    </>
);
};