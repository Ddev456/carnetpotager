import Image from 'next/image';
import React, { type Dispatch, type SetStateAction, useState } from 'react';
import { useWizard } from '~/context/WizardContext';
import { AiFillCheckCircle } from 'react-icons/ai';
import { getPotager, handlePotager } from './VegetableSheet';
import { type VegetableType } from '~/lib/scheme/vegetables';

type ElementGalleryProps = {
    setSelectionToDisplay: Dispatch<SetStateAction<object>>;
    item: VegetableType;
    isSelected: boolean;
}

export const MonPotagerItems = () => {
    const [selection] = useState(getPotager());
    return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
    <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Mon potager
    </h5>
    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Retrouvez toutes les plantes cultivées au potager</p>
    <ul className="my-4 space-y-3">
        {Object.values(selection).map((selectionItem) => 
        <li key={selectionItem.vegetable.id}>
            <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <Image width={65} height={65} alt="thumbnail" src={selectionItem.vegetable.icon} />
                <span className="flex-1 ml-3 whitespace-nowrap">{selectionItem.vegetable.name}</span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Cultivé</span>
            </a>
        </li>
        )}
    </ul>
    <div>
        <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
            <svg className="w-3 h-3 mr-2" aria-hidden="true" focusable="false" data-prefix="far" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
            Comment gérer mon potager ?</a>
    </div>
</div>

    );
};

const ElementGallery = ({setSelectionToDisplay, item, isSelected}: ElementGalleryProps) => {
    const handleClick = (item: VegetableType) => {
        const handleSelection = handlePotager(item.id.toString(), item);
        setSelectionToDisplay(handleSelection);
      };

    return <div onClick={() => handleClick(item)} className='hover:cursor-pointer w-[8rem] h-[8rem] relative' key={item.id}>
        {isSelected ?
        <span className="bg-blue-200 font-medium text-blue-800 text-center p-0.5 leading-none rounded-full px-2 dark:bg-blue-900 dark:text-blue-200 absolute -translate-y-1/2 translate-x-1/2 left-auto top-0 right-0 text-[2rem]"><AiFillCheckCircle /></span>
        : null}
        <Image className="hover:opacity-75 h-auto max-w-full rounded-lg" width={120} height={120} src={item.thumbnail} alt="thumbnail" />
    </div>;
};

export const PotagerGallery = () => {
    const { values } = useWizard();
    const [query, setQuery] = useState("");
    const selection = values.filter((vegetable) =>
    vegetable.category
      .toLowerCase()
      .replace(/\s+/g, '')
      .includes(query.toLowerCase().replace(/\s+/g, ''))
  );
//   const selectionStorage = JSON.parse(localStorage.getItem("selection") ?? JSON.stringify({"selection1":{vegetable:{}, selected: false}}));

  const[selectionToDisplay, setSelectionToDisplay] = useState(getPotager());
  const isSelected = (id: number): boolean => Object.keys(selectionToDisplay).some((selectItem: string) => selectItem === `selection${id}`);
    return (
    <>
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                    <button type="button" onClick={() => setQuery("")} className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">Tout</button>
                    <button type="button" onClick={() => setQuery("aromatique")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Aromatiques</button>
                    <button type="button" onClick={() => setQuery("légume")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Légumes</button>
                    <button type="button" onClick={() => setQuery("fruit")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Fruits</button>
                    <button type="button" onClick={() => setQuery("fleur")} className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800">Fleurs</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 overflow-auto">
        { selection.map((item) => {
            return(
            <ElementGallery key={item.id} isSelected={isSelected(item.id)} setSelectionToDisplay={setSelectionToDisplay} item={item}/>);
        })}
        </div>  
    </>
);
};
