import { Combobox, Transition } from '@headlessui/react';
// import { type UseQueryOptions } from '@tanstack/react-query';
import { useState, Fragment } from 'react';
import { useFormContext } from "react-hook-form";
import { HiChevronUpDown } from 'react-icons/hi2';
import { AiOutlineCheck } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { client } from '~/lib/client/client';
import { VegetablesScheme, type VegetableType } from '~/lib/scheme/vegetables';
import { Loader } from '~/components/Loader';
import { Error } from '~/components/Error';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

// interface UseTRPCQueryOptions extends UseQueryOptions{
//   trpc: {
//     refetchOnWindowFocus: boolean;
//   }
// }
const notifyFailed = () => toast.error("Couldn't fetch vegetables...");

const getAllVegetables = async (signal?: AbortSignal) =>
  client(`/api/vegetables`, { signal, zodSchema: VegetablesScheme });

export const SelectionStep = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['vegetables'],
        queryFn: ({ signal }) => getAllVegetables(signal),
        onError: () => {
            notifyFailed();
        },
    });

        const [selected, setSelected] = useState<number[]>([]);
        const [query, setQuery] = useState('');
        const { setValue } = useFormContext();

        if (isLoading) {
            return <Loader />;
            }
        
            if (isError) {
            return <Error error="Couldn't fetch vegetables..." reset={() => refetch()} />;
            }

        const filteredVegetable =
         data.vegetables.filter((vegetable) =>
                vegetable.name
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .includes(query.toLowerCase().replace(/\s+/g, ''))
              );
  return (
    <div className="w-72">
            <Combobox multiple value={selected} onChange={(data) => { 
                setSelected(data); 
                setValue('selection', data);
                }}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-primary__variant text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary__variant focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
                  <Combobox.Input
                    placeholder='Chercher une plante potagère'
                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-dark focus:ring-0"
                    displayValue={(vegetable: VegetableType) => vegetable.name}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiChevronUpDown
                      className="h-5 w-5 text-dark"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary__variant py-1 text-base shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredVegetable.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-dark">
                        Aucun résultat.
                      </div>
                    ) : (
                      filteredVegetable.map((vegetable) => (
                        <Combobox.Option
                          key={vegetable.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-grayscale text-dark' : 'text-dark'
                            }`
                          }
                          value={vegetable}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`flex truncate ${
                                  selected ? 'font-bold' : 'font-semibold'
                                }`}
                              >
                               <Image className='rounded-full' alt="thumbnail" height={40} width={40} src={vegetable.icon} />
                               <span className='ml-2'>{vegetable.name}</span>
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-primary__variant' : 'text-primary'
                                  }`}
                                >
                                  <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
  );
};
