import React, { useState } from 'react';
import { SearchInput } from '~/components/SearchInput';
// import { SelectInput } from '~/components/SelectInput';
import LegumothequeLayout from '~/components/LegumothequeLayout';
// import { type PlantType } from '~/lib/scheme/plants';
import { VegetableSheet } from '~/components/VegetableSheet';
import * as Accordion from '@radix-ui/react-accordion';
import { getAllPlants } from '~/server/plants';
import { type Plants } from '@prisma/client';
import clsx from 'clsx';

const Legumotheque = ({plants}: {plants: Plants[]}) => {
    const [vegetablesList, setVegetablesList] = useState<Plants[]>(plants);
        const [plantsArray, setPlantsArray] = useState(plants);
        const[selected, setSelected] = useState("all");
        const handleCategory = (event: string, tab: string) => {
            const keys = ["category"] as const;
            setSelected(tab);
            setPlantsArray(plants.filter((item) => 
            keys.some((key) => item[key]?.toLowerCase().includes(event.toLowerCase()))
            ));
            setVegetablesList(plants.filter((item) => 
            keys.some((key) => item[key]?.toLowerCase().includes(event.toLowerCase()))
            ));
        };

        const handleChange = (event: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>  ) => {
            const keys = ["name", "category", "id"] as const;
            setVegetablesList(plantsArray.filter((item) =>
            keys.some((key) => item[key]?.toString().toLowerCase().includes(event.currentTarget.value.toLowerCase()))
      ));
        };

    return (

<div className="bg-gray-50 w-full h-full relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex flex-col sm:flex-row items-center justify-between p-4">
        {/* <SelectInput handleChange={handleCategory}/> */}

<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
            <button onClick={() => handleCategory("", "all")} id="all-tab" className={clsx("inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
            {"text-blue-600 border-blue-600 border-b-2" : selected === "all"})}
            >Tout
            {selected === "all" ? <span className='bg-gray-200 ml-1 px-1'>{vegetablesList.length}</span> : null }
            </button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleCategory("légume", "vegetable")} id="vegetables-tab" role="tab" className={clsx("inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
            {"text-blue-600 border-blue-600 border-b-2" : selected === "vegetable"})}
            >Légumes
            {selected === "vegetable" ? <span className='bg-gray-200 ml-1 px-1'>{vegetablesList.length}</span> : null }
            </button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleCategory("aromatique", "aromatique")} id="aromatique-tab" className={clsx("inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
            {"text-blue-600 border-blue-600 border-b-2" : selected === "aromatique"})}
            >Aromatiques
            {selected === "aromatique" ? <span className='bg-gray-200 ml-1 px-1'>{vegetablesList.length}</span> : null }
            </button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleCategory("fruit", "fruit")} id="fruit-tab" className={clsx("inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
            {"text-blue-600 border-blue-600 border-b-2" : selected === "fruit"})}
            >Fruits
            {selected === "fruit" ? <span className='bg-gray-200 ml-1 px-1'>{vegetablesList.length}</span> : null }
            </button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleCategory("fleur", "flower")} id="flower-tab" className={clsx("inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
            {"text-blue-600 border-blue-600 border-b-2" : selected === "flower"})}
            >Fleurs
            {selected === "flower" ? <span className='bg-gray-200 ml-1 px-1'>{vegetablesList.length}</span> : null }
            </button>
        </li>
    </ul>
</div>

        <SearchInput handleChange={handleChange} />
    </div>
    <LegumothequeLayout>
        <Accordion.Root
                className="w-full h-full rounded-md"
                type="single"
                defaultValue="item-1"
                collapsible
            >
        {vegetablesList.map((vegetable) => (
            <VegetableSheet key={vegetable.id} accordionItemId={vegetable.id} vegetable={vegetable}/>
            ))}
        </Accordion.Root>
    </LegumothequeLayout>
</div>

  );
};

export async function getStaticProps() {
    // const vegetables = [
    //     {
    //         id: 1,
    //         createdAt: 1681398350,
    //         thumbnail: "https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg",
    //         name: "Tomate",
    //         category: "légume",
    //         family: "Solanaceae",
    //         gender: "Solanum",
    //         seedling: "Mars à Mai",
    //         harvest: "Mi-Juin à Novembre",
    //         exposition: "Ensoleillé",
    //         seedlingInfo: "",
    //         cultureInfo: "",
    //         harvestInfo: "",
    //         water: 2,
    //     },
    //     {
    //         id: 2,
    //         createdAt: 1681398350,
    //         thumbnail: "https://cdn.pixabay.com/photo/2018/06/22/13/52/beetroot-3490809_640.jpg",
    //         name: "Betterave",
    //         category: "légume",
    //         family: "Chenopodiaceae",
    //         gender: "Beta",
    //         seedling: "Mars à Mai",
    //         harvest: "Mi-Juin à Novembre",
    //         exposition: "Mi-Ombre",
    //         seedlingInfo: "",
    //         cultureInfo: "",
    //         harvestInfo: "",
    //         water: 3,
    //     }
    // ];
    const plants = await getAllPlants();
    return { 
    props: { 
        plants: JSON.parse(JSON.stringify(plants)) 
        } 
    };
  }
  

export default Legumotheque;