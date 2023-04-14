import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { type EventType } from '~/lib/scheme/events';
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
  return (
    <>
    <FullCalendar
    locale={frLocale}
    headerToolbar={buildToolbar()}
    events={events}
    plugins={[ dayGridPlugin, listPlugin, multiMonthPlugin ]}
    height={'100%'}
    initialView="dayGridMonth"
    /> 
    </>
  );
};
