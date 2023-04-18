import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { type EventType } from '~/lib/scheme/events';
import frLocale from '@fullcalendar/core/locales/fr';
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from '@fullcalendar/multimonth';
import { useState, type Dispatch, type SetStateAction } from 'react';
import clsx from 'clsx';

export const Calendar = ({setShowModal, events, setCalendarType, mediterEvents, oceanicEvents, halfOceanicEvents, continentEvents, mountainEvents, potagerEvents}: {setShowModal: Dispatch<SetStateAction<boolean>>, events: EventType[], setCalendarType: Dispatch<SetStateAction<EventType[]>>, mediterEvents: EventType[], oceanicEvents: EventType[], halfOceanicEvents: EventType[], continentEvents: EventType[], mountainEvents: EventType[], potagerEvents: EventType[]}) => {

  // const [buttonSelected, setButtonSelected] = useState("bg-lime-200");
  const [viewClassNames, setViewClassNames] = useState("bg-orange-50");
  const [activeTab, toggleActiveTab] = useState("potager");

  const handleTab = (tab: string) => {
    toggleActiveTab(tab);
    if(tab === "potager"){
      setCalendarType(potagerEvents);
      setViewClassNames("bg-lime-50");
    }else if(tab === "mediter"){
      setCalendarType(mediterEvents);
      setViewClassNames("bg-orange-50");
    }else if(tab === "oceanic") {
      setCalendarType(oceanicEvents);
      setViewClassNames("bg-blue-50");
    }else if(tab === "halfOceanic") {
      setCalendarType(halfOceanicEvents);
      setViewClassNames("bg-cyan-50");
    }else if(tab === "continent") {
      setCalendarType(continentEvents);
      setViewClassNames("bg-emerald-50");
    }else if(tab === "mountain") {
      setCalendarType(mountainEvents);
      setViewClassNames("bg-stone-50");
    }
  };

  const buildToolbar = () => {
      const headerToolbar = {
        left: '',
        center: 'today prev,title,next',
        right: 'wizardButton'
      };
      return headerToolbar;
    };

  type eventInfoType = {
    event: {
      title: string;
      extendedProps: { 
          action: string;
          plant: string;
      }
    }
  }

  const renderEventContent = (eventInfo: eventInfoType) => {
    const renderAction = (action: string) => {
      switch (action) {
      case "nursery":
        return "🌱";
        // return <GiGardeningShears className='text-[2rem]' />;
      case "seedling":
        return "🌱";
      case "transplanting":
        return "🪴";
        // return <TbPlant className='text-[2rem]' />;
      case "thinning":
        return "🫳";  
      // return <MdSpaceBar className='text-[2rem]' />;
      case "plantation":
        return "🧑‍🌾";
        // return <TbShovel className='text-[2rem]' />;
      case "harvest":
        return "🧺";
        // return <FaShoppingBasket className='text-[2rem]' />;
      default:
        break;
    }
  };
    return (
      <div className='flex'>
        <>
        <img className='w-[80%] sm:w-[2rem] h-[80%] sm:h-[2rem]' src={eventInfo.event.extendedProps.plant}/>
        <p className='sm:block hidden font-semibold'> {eventInfo.event.title}</p>
        <span className='sm:block sm:text-dark hidden'>{renderAction(eventInfo.event.extendedProps.action)}</span>
        </>
      </div>
    );
  };

  return (
    <>
    <FullCalendar
    viewClassNames={viewClassNames}
    locale={frLocale}
    eventContent= {renderEventContent}
    customButtons={{wizardButton: {
      text: "⚡Assistant",
      click: function(){
        setShowModal(true);
      }
    }}}
    headerToolbar={buildToolbar()}
    events={events}
    plugins={[ dayGridPlugin, listPlugin, multiMonthPlugin ]}
    height={'100%'}
    initialView="dayGridMonth"
    /> 
    <div className="bottom-0 fixed p-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex -mb-px sm:max-w-full max-w-[65%] overflow-x-auto">
        <li className="mr-2">
            <button onClick={() => handleTab("potager")} className={clsx("inline-block p-4 border-b-2 rounded-t-lg",
            {"border-b-2 border-blue-600": activeTab === "potager"},
            {"border-transparent hover:text-gray-600 hover:border-gray-300": activeTab !== "potager"})} aria-current="page">Mon Potager</button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleTab("mediter")} className={clsx("inline-block p-4 border-b-2 text-dark rounded-t-lg active",
            {"border-b-2 border-blue-600 text-blue-600": activeTab === "mediter"},
            {"border-transparent hover:text-gray-600 hover:border-gray-300": activeTab !== "mediter"})}>Medit.</button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleTab("oceanic")} className={clsx("inline-block p-4 border-b-2 rounded-t-lg active",
            {"border-b-2 border-blue-600 text-blue-600": activeTab === "oceanic"},
            {"border-transparent hover:text-gray-600 hover:border-gray-300": activeTab !== "oceanic"})}>Ocean.</button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleTab("halfOceanic")} className={clsx("inline-block p-4 border-b-2 rounded-t-lg active",
            {"border-b-2 border-blue-600 text-blue-600": activeTab === "halfOceanic"},
            {"border-transparent hover:text-gray-600 hover:border-gray-300": activeTab !== "halfOceanic"})}>Semi-Ocean.</button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleTab("continent")} className={clsx("inline-block p-4 border-b-2 rounded-t-lg active",
            {"border-b-2 border-blue-600 text-blue-600": activeTab === "continent"},
            {"border-transparent hover:text-gray-600 hover:border-gray-300": activeTab !== "continent"})}>Contin.</button>
        </li>
        <li className="mr-2">
            <button onClick={() => handleTab("mountain")} className={clsx("inline-block p-4 border-b-2 rounded-t-lg active",
            {"border-b-2 border-blue-600 text-blue-600": activeTab === "mountain"},
            {"border-transparent hover:text-gray-600 hover:border-gray-300": activeTab !== "mountain"})}>Montagn.</button>
        </li>
    </ul>
</div>
    </>
  );
};
