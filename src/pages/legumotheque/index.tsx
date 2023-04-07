import React, { useState } from 'react';
import { SearchInput } from '~/components/SearchInput';
import { SelectInput } from '~/components/SelectInput';
import LegumothequeLayout from '~/components/LegumothequeLayout';
// import { useQuery } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast';
// import { client } from '~/lib/client/client';
import { type VegetableType } from '~/lib/scheme/vegetables';
import { VegetableSheet } from '~/components/VegetableSheet';
// import { Loader } from '~/components/Loader';
// import { Error } from '~/components/Error';
import * as Accordion from '@radix-ui/react-accordion';
import { getAllVegetables } from '~/server/vegetable';
// import { type Vegetable } from '@prisma/client';

// const notifyFailed = () => toast.error("Impossible de récupérer les données...");

// const getAllVegetables = async (signal?: AbortSignal) =>
//   client(`/api/vegetables`, { signal, zodSchema: VegetablesScheme });

const Legumotheque = ({vegetables}: {vegetables: VegetableType[]}) => {
    // const { data, isLoading, isError, refetch } = useQuery({
    //     queryKey: ['vegetables'],
    //     queryFn: ({ signal }) => getAllVegetables(signal),
    //     onError: () => {
    //         notifyFailed();
    //     },
    // });
    const [vegetablesList, setVegetablesList] = useState<VegetableType[]>(vegetables);

    // useEffect(()=>{
    //     setVegetablesList(vegetables);
    //     // setVegetablesList(data?.vegetables ?? []);
    // },[data]);

        // if (isLoading) {
        // return <Loader />;
        // }
    
        // if (isError) {
        // return <Error error="Impossible de récupérer les données ..." reset={() => refetch()} />;
        // }

        // const vegetables = data.vegetables;
        
        const handleCategory = (event: string) => {
            const keys = ["category"] as const;
            setVegetablesList(vegetables.filter((item) => 
            keys.some((key) => item[key].toLowerCase().includes(event.toLowerCase()))
            ));
        };

        const handleChange = (event: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>  ) => {
            const keys = ["name", "family", "category", "exposition"] as const;
            setVegetablesList(vegetables.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(event.currentTarget.value.toLowerCase()))
      ));
        };

    return (

<div className="m-4 bg-dark w-full h-full relative overflow-x-auto shadow-md sm:rounded-lg">
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

export async function getServerSideProps() {
    // Fetch data from external API
    const vegetables = await getAllVegetables(0);
  
    // Pass data to the page via props
    return { 
    props: { 
        vegetables: JSON.parse(JSON.stringify(vegetables)) 
        } 
    };
  }
  

export default Legumotheque;