import { Calendar } from '~/components/Calendar/Calendar';
// import { type EventType } from '~/lib/scheme/events';
// import { getAllEvents } from '~/server/event';
// import { getAllVegetables } from '~/server/vegetable';
import { WizardContextProvider } from '~/context/WizardContext';
import { dynamicEvents } from '~/lib/calendar/dynamicEvents';
import { useState } from 'react';
import { type EventType } from '~/lib/scheme/events';
import { getAllEvents } from '~/server/event';
import { getAllPlants } from '~/server/plants';
import { type Plants, type NativesEvents } from '@prisma/client';
import { WizardModal } from '~/components/WizardModal';
// import { usePotager } from '~/lib/usePotager';
import { useReadLocalStorage } from 'usehooks-ts';
import { type plantLs } from '~/lib/usePotager';
// import { useClimate } from '~/lib/useClimate';
import { type ClimateType } from '~/components/Wizard/Form/Map';

// const Calendrier = ({vegetables, nativesEvents}: {vegetables: VegetableType[], nativesEvents: nativeEvent[]}) => {
const Calendrier = ({plants, nativesEvents, mediterEvents, oceanicEvents, halfOceanicEvents, continentEvents, mountainEvents}: {plants: Plants[], nativesEvents: NativesEvents[], mediterEvents: EventType[], oceanicEvents: EventType[], halfOceanicEvents: EventType[], continentEvents: EventType[], mountainEvents: EventType[]}) => {
  const selection: plantLs[] = useReadLocalStorage("selection") ?? [];
  const climate: ClimateType = useReadLocalStorage("climate") ?? {};
  const potagerSelectionEvents = nativesEvents.filter(nativeItem => {
  return selection.find(plant => plant.plant.id == nativeItem.plantId);
  }
  );
  const [potagerEvents] = useState(dynamicEvents(plants, potagerSelectionEvents, climate.climate).potager());

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
