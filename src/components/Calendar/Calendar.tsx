import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { type EventType } from '~/lib/scheme/events';
import { EmptyCalendar } from './EmptyCalendar';
import { WizardModal } from '../WizardModal';
import frLocale from '@fullcalendar/core/locales/fr';
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from '@fullcalendar/multimonth';

export const Calendar = ({events}: {events: EventType[]}) => {
  const buildToolbar = () => {
    return {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth,multiMonthYear'
    };
  };
  const [showModal, setShowModal] = useState(false);
  const enabled = typeof window !== "undefined" ? localStorage.getItem("isCalendarEmpty") : null;
  
  return (
    <>
    <WizardModal showModal={showModal} setShowModal={setShowModal}/>
    { enabled ?
    <FullCalendar
    locale={frLocale}
    headerToolbar={buildToolbar()}
    events={events}
    plugins={[ dayGridPlugin, listPlugin, multiMonthPlugin ]}
    height={'100%'}
    initialView="dayGridMonth"
    /> : 
    <EmptyCalendar setShowModal={setShowModal}/>
    }
    </>
  );
};
