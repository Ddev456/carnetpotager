import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { type ClimateType } from "~/components/Wizard/Form/Map";

export const useClimate = () => {
    const [climate, setClimate] = useLocalStorage<ClimateType>("climate", {});

    const addToClimate = (climateLs: ClimateType) => {
        setClimate(climateLs);
    };

useEffect(() => {
  if (!climate.climate) return;
  localStorage.setItem('climate', JSON.stringify(climate));
}, [climate]);


useEffect(() => {
  const climateFromLocalStorage = localStorage.getItem('climate');

  const parsedClimate =
  climateFromLocalStorage !== null
    ? JSON.parse(climateFromLocalStorage)
    : [];

  setClimate(parsedClimate);
}, []);

return { climate, addToClimate };
};
