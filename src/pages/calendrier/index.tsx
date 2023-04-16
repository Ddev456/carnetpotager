import { Calendar } from '~/components/Calendar/Calendar';
// import { type EventType } from '~/lib/scheme/events';
// import { getAllEvents } from '~/server/event';
// import { getAllVegetables } from '~/server/vegetable';
import { WizardContextProvider } from '~/context/WizardContext';
import { dynamicEvents } from '~/lib/calendar/dynamicEvents';
import { useState } from 'react';
import { getPotager } from '~/components/VegetableSheet';
import { type EventType } from '~/lib/scheme/events';
import { getAllEvents } from '~/server/event';
import { getAllPlants } from '~/server/plants';
import { type Plants, type NativesEvents } from '@prisma/client';
import { getClimate } from '~/components/Wizard/Form/Map';
import { WizardModal } from '~/components/WizardModal';

// const Calendrier = ({vegetables, nativesEvents}: {vegetables: VegetableType[], nativesEvents: nativeEvent[]}) => {
const Calendrier = ({plants, nativesEvents, mediterEvents, oceanicEvents, halfOceanicEvents, continentEvents, mountainEvents}: {plants: Plants[], nativesEvents: NativesEvents[], mediterEvents: EventType[], oceanicEvents: EventType[], halfOceanicEvents: EventType[], continentEvents: EventType[], mountainEvents: EventType[]}) => {
  const [potagerSelection] = useState((getPotager()));
  const [climate] = useState(getClimate());
  const potagerSelectionEvents = nativesEvents.filter(nativeItem => {
  const keySelectionOfLs = `selection${nativeItem.plantId}` as string;
  return Object.keys(potagerSelection).includes(keySelectionOfLs);
  }
  );

  const potagerEvents = dynamicEvents(plants, potagerSelectionEvents, climate.climate).potager();

  const [calendarType, setCalendarType] = useState(continentEvents);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <WizardContextProvider values={plants}>
        <WizardModal showModal={showModal} setShowModal={setShowModal}/>
        <Calendar setShowModal={setShowModal} events={calendarType} setCalendarType={setCalendarType} mediterEvents={mediterEvents} oceanicEvents={oceanicEvents} halfOceanicEvents={halfOceanicEvents} continentEvents={continentEvents} mountainEvents={mountainEvents} potagerEvents={potagerEvents}/> 
      </WizardContextProvider>
    </>
  );
};


export async function getStaticProps() {
//   const nativesEvents = [{
//     id: 'art23x4t7aa89io5',
//     plantId: 1,
//     nursery: 9,
//     seedling: 10,
//     transplanting: 12,
//     plantation: 18,
//     harvest: 27,
//   },{
//     id: 'art26x4t4aa19io1',
//     plantId: 2,
//     nursery: 9,
//     seedling: 11,
//     transplanting: 12,
//     thinning: 14,
//     plantation: 0,
//     harvest: 28,
//   }];
//   const plants = [
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
const nativesEvents = await getAllEvents();
const plants = await getAllPlants();

const mediterEvents = dynamicEvents(plants, nativesEvents).mediter();
const oceanicEvents = dynamicEvents(plants, nativesEvents).oceanic();
const halfOceanicEvents = dynamicEvents(plants, nativesEvents).halfOceanic();
const continentEvents = dynamicEvents(plants, nativesEvents).continent();
const mountainEvents = dynamicEvents(plants, nativesEvents).mountain();
  return { 
  // props: { 
  //     nativesEvents: JSON.parse(JSON.stringify(nativesEvents)),
  //     plants: JSON.parse(JSON.stringify(plants)),
  //     } 
  props: { 
      nativesEvents: JSON.parse(JSON.stringify(nativesEvents)),
      plants: JSON.parse(JSON.stringify(plants)),
      mediterEvents: JSON.parse(JSON.stringify(mediterEvents)),
      oceanicEvents: JSON.parse(JSON.stringify(oceanicEvents)),
      halfOceanicEvents: JSON.parse(JSON.stringify(halfOceanicEvents)),
      continentEvents: JSON.parse(JSON.stringify(continentEvents)),
      mountainEvents: JSON.parse(JSON.stringify(mountainEvents))
      } 
  };
}

export default Calendrier;
