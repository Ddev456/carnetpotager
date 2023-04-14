import { Calendar } from '~/components/Calendar/Calendar';
// import { type EventType } from '~/lib/scheme/events';
import { type VegetableType } from '~/lib/scheme/vegetables';
// import { getAllEvents } from '~/server/event';
// import { getAllVegetables } from '~/server/vegetable';
import { WizardContextProvider } from '~/context/WizardContext';
import { dynamicEvents, type nativeEvent } from '~/lib/calendar/dynamicEvents';

const Calendrier = ({nativesEvents, vegetables}: {nativesEvents: nativeEvent[], vegetables: VegetableType[]}) => {

const mediterEvents = dynamicEvents(nativesEvents).mediter();
const oceanicEvents = dynamicEvents(nativesEvents).oceanic();
const halfOceanicEvents = dynamicEvents(nativesEvents).halfOceanic();
const continentEvents = dynamicEvents(nativesEvents).continent();
const mountainEvents = dynamicEvents(nativesEvents).mountain();

console.log(mediterEvents);
console.log(oceanicEvents);
console.log(halfOceanicEvents);
console.log(mountainEvents);


  return (
    <>
      <WizardContextProvider values={vegetables}>
        <Calendar events={continentEvents} /> 
      </WizardContextProvider>
    </>
  );
};


export async function getStaticProps() {
  const nativesEvents = [{
    id: 'art23x4t7aa89io5',
    plantId: 1,
    nursery: 9,
    seedling: 0,
    transplanting: 12,
    thinning: 0,
    plantation: 18,
    harvest: 27,
  },{
    id: 'art26x4t4aa19io1',
    plantId: 2,
    nursery: 9,
    seedling: 11,
    transplanting: 12,
    thinning: 14,
    plantation: 0,
    harvest: 28,
  }];
  const plants = [
    {
        id: 1,
        createdAt: 1681398350,
        thumbnail: "https://cdn.pixabay.com/photo/2020/09/12/21/14/tomatoes-5566744_640.jpg",
        name: "Tomate",
        category: "légume",
        family: "Solanaceae",
        gender: "Solanum",
        seedling: "Mars à Mai",
        harvest: "Mi-Juin à Novembre",
        exposition: "Ensoleillé",
        seedlingInfo: "",
        cultureInfo: "",
        harvestInfo: "",
        water: 2,
    },
    {
        id: 2,
        createdAt: 1681398350,
        thumbnail: "https://cdn.pixabay.com/photo/2018/06/22/13/52/beetroot-3490809_640.jpg",
        name: "Betterave",
        category: "légume",
        family: "Chenopodiaceae",
        gender: "Beta",
        seedling: "Mars à Mai",
        harvest: "Mi-Juin à Novembre",
        exposition: "Mi-Ombre",
        seedlingInfo: "",
        cultureInfo: "",
        harvestInfo: "",
        water: 3,
    }
];
  return { 
  props: { 
      nativesEvents: JSON.parse(JSON.stringify(nativesEvents)),
      plants: JSON.parse(JSON.stringify(plants))
      } 
  };
}

export default Calendrier;
