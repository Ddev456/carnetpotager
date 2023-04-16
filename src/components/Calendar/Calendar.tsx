import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { type EventType } from '~/lib/scheme/events';
import frLocale from '@fullcalendar/core/locales/fr';
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from '@fullcalendar/multimonth';
// import { MdFlashAuto } from 'react-icons/md';
import { GiGardeningShears } from 'react-icons/gi';
// import { BsChevronDown } from 'react-icons/bs';
import { FaShoppingBasket } from 'react-icons/fa';
import { MdSpaceBar } from 'react-icons/md';
import { TbShovel, TbPlant } from 'react-icons/tb';
import { RiSeedlingFill } from 'react-icons/ri';
import { useState, type Dispatch, type SetStateAction } from 'react';

export const Calendar = ({setShowModal, events, setCalendarType, mediterEvents, oceanicEvents, halfOceanicEvents, continentEvents, mountainEvents, potagerEvents}: {setShowModal: Dispatch<SetStateAction<boolean>>, events: EventType[], setCalendarType: Dispatch<SetStateAction<EventType[]>>, mediterEvents: EventType[], oceanicEvents: EventType[], halfOceanicEvents: EventType[], continentEvents: EventType[], mountainEvents: EventType[], potagerEvents: EventType[]}) => {
  
  const [headerOptions, setHeaderOptions] = useState(true);
  // const [buttonSelected, setButtonSelected] = useState("bg-lime-200");
  const [viewClassNames, setViewClassNames] = useState("bg-orange-50");

  const buildToolbar = () => {
    let headerToolbar;
    if(headerOptions){
      headerToolbar = {
        left: 'mediterButton oceanicButton halfOceanicButton continentButton mountainButton',
        center: 'prev,title,next today menuToggle',
        right: 'wizardButton potagerButton dayGridMonth,listMonth,multiMonthYear'
      };
    }else{
      headerToolbar = {
        left: '',
        center: 'prev,title,next today menuToggle',
        right: ''
      };
    }
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
        return <GiGardeningShears className='text-[2rem]' />;
      case "seedling":
        return <RiSeedlingFill className='text-[2rem]' />;
      case "transplanting":
        return <TbPlant className='text-[2rem]' />;
      case "thinning":
        return <MdSpaceBar className='text-[2rem]' />;
      case "plantation":
        return <TbShovel className='text-[2rem]' />;
      case "harvest":
        return <FaShoppingBasket className='text-[2rem]' />;
      default:
        break;
    }
  };

    return (
      <div className='flex'>
        <>
        <img className='w-[2rem] h-[2rem] rounded-lg' src={eventInfo.event.extendedProps.plant}/>
        <p className='sm:block hidden font-semibold'> {eventInfo.event.title}</p>
        {renderAction(eventInfo.event.extendedProps.action)}
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
      text: "Assistant",
      click: function(){
        setShowModal(true);
      }},
      menuToggle: {
        text: 'Menu',
        click: function(){
          setHeaderOptions(!headerOptions);
        }
      },
      potagerButton: {
      text: 'Mon potager',
      click: function(){
        // setButtonSelected("bg-lime-200");
        setCalendarType(potagerEvents);
        setHeaderOptions(false);
        setViewClassNames("bg-lime-50");
      }
    },mediterButton: {
      text: 'Méditerannéen',
      click: function(){
        // setButtonSelected("bg-orange-200");
        setCalendarType(mediterEvents);
        setHeaderOptions(false);
        setViewClassNames("bg-orange-50");
      }
    }, oceanicButton: {
      text: 'Océanique',
      click: function(){
        // setButtonSelected("bg-blue-400");
        setCalendarType(oceanicEvents);
        setHeaderOptions(false);
        setViewClassNames("bg-blue-50");
      }
    }, halfOceanicButton: {
      text: 'Semi-Océanique',
      click: function(){
        // setButtonSelected("bg-cyan-200");
        setCalendarType(halfOceanicEvents);
        setHeaderOptions(false);
        setViewClassNames("bg-cyan-50");
      }
    }, continentButton: {
      text: 'Continental',
      click: function(){
        // setButtonSelected("bg-emerald-300");
        setCalendarType(continentEvents);
        setHeaderOptions(false);
        setViewClassNames("bg-emerald-50");
      }
    }, mountainButton: {
      text: 'Montagnard',
      click: function(){
        // setButtonSelected("bg-stone-400");
        setCalendarType(mountainEvents);
        setHeaderOptions(false);
        setViewClassNames("bg-stone-50");
      }
    }}}
    headerToolbar={buildToolbar()}
    events={events}
    plugins={[ dayGridPlugin, listPlugin, multiMonthPlugin ]}
    height={'100%'}
    initialView="dayGridMonth"
    /> 
    </>
  );
};
