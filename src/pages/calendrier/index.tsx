import { Calendar } from '~/components/Calendar/Calendar';
import { type EventType } from '~/lib/scheme/events';
import { type VegetableType } from '~/lib/scheme/vegetables';
import { getAllEvents } from '~/server/event';
import { getAllVegetables } from '~/server/vegetable';
import { WizardContextProvider } from '~/context/WizardContext';

const Calendrier = ({events, vegetables}: {events: EventType[], vegetables: VegetableType[]}) => {

  return (
    <>
      <WizardContextProvider values={vegetables}>
        <Calendar events={events} /> 
      </WizardContextProvider>
    </>
  );
};


export async function getStaticProps() {
  const events = await getAllEvents();
  const vegetables = await getAllVegetables();
  return { 
  props: { 
      events: JSON.parse(JSON.stringify(events)),
      vegetables: JSON.parse(JSON.stringify(vegetables))
      } 
  };
}

export default Calendrier;
