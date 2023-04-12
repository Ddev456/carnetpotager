import React, { useState } from 'react';
import { SearchInput } from '~/components/SearchInput';
import { SelectInput } from '~/components/SelectInput';
import LegumothequeLayout from '~/components/LegumothequeLayout';
import { type VegetableType } from '~/lib/scheme/vegetables';
import { VegetableSheet } from '~/components/VegetableSheet';
import * as Accordion from '@radix-ui/react-accordion';
import { getAllVegetables } from '~/server/vegetable';

const Legumotheque = ({vegetables}: {vegetables: VegetableType[]}) => {
    const [vegetablesList, setVegetablesList] = useState<VegetableType[]>(vegetables);
        
        const handleCategory = (event: string) => {
            const keys = ["category"] as const;
            setVegetablesList(vegetables.filter((item) => 
            keys.some((key) => item[key].toLowerCase().includes(event.toLowerCase()))
            ));
        };

        const handleChange = (event: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>  ) => {
            const keys = ["name", "family", "category", "exposition", "id"] as const;
            setVegetablesList(vegetables.filter((item) =>
            keys.some((key) => item[key].toString().toLowerCase().includes(event.currentTarget.value.toLowerCase()))
      ));
        };

    return (

<div className="bg-gray-400 w-full h-full relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex flex-col sm:flex-row items-center justify-between p-4">
        <SelectInput handleChange={handleCategory}/>
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
    const vegetables = await getAllVegetables(0);
    return { 
    props: { 
        vegetables: JSON.parse(JSON.stringify(vegetables)) 
        } 
    };
  }
  

export default Legumotheque;