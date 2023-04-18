import { type Plants } from '@prisma/client';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export type plantLs = {
  id: number;
  plant: Plants
}

export const usePotager = () => {

  const [selection, setSelection] = useLocalStorage<plantLs[]>("selection", []);
  // const [selection, setSelection] = useState<plantLs[]>(typeof window !== undefined && localStorage.getItem("selection"));


    const addToSelection = (id: number, plant: Plants) => {
            // const indexToRemove = selection.indexOf({id: id, plant: plant});
            // const isExist = selection.includes(id);
        if(!selection.find(plant => plant.id == id)){
          if(selection.length !== 0){
            
            setSelection(selection.concat([{id: id, plant: plant}]));
          }else {
        setSelection([{id: id, plant: plant}]);
          }  
      }else{
          const newArray = selection.filter(plantItem => plantItem.id !== id);
          setSelection(newArray);
        }
    };
  
    useEffect(() => {
      if (selection.length === 0) return;
      localStorage.setItem('selection', JSON.stringify(selection));
    }, [selection]);
  
  
    useEffect(() => {
      const selectionFromLocalStorage = localStorage.getItem('selection');

      const parsedSelection =
      selectionFromLocalStorage !== null
        ? JSON.parse(selectionFromLocalStorage)
        : [];
  
      setSelection(parsedSelection);
    }, []);

  return { selection, addToSelection };
};
