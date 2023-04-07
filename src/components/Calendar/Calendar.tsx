import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useQuery } from '@tanstack/react-query';
import { client } from '~/lib/client/client';
import { toast } from 'react-hot-toast';
import { EventsScheme } from '~/lib/scheme/events';
import { Loader } from '../Loader';
import { Error } from '../Error';
import { EmptyCalendar } from './EmptyCalendar';
import { WizardModal } from '../WizardModal';
import frLocale from '@fullcalendar/core/locales/fr';
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from '@fullcalendar/multimonth';

const notifyFailed = () => toast.error("Couldn't fetch events...");

const getAllEvents = async (signal?: AbortSignal) =>
  client(`/api/events`, { signal, zodSchema: EventsScheme });

export const Calendar = () => {
  const buildToolbar = () => {
    return {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth,multiMonthYear'
    };
  };
  const [showModal, setShowModal] = useState(false);
  const enabled = typeof window !== "undefined" ? localStorage.getItem("isCalendarEmpty") : null;
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: ({ signal }) => getAllEvents(signal),
    onError: () => {
        notifyFailed();
    },
    enabled: enabled === "true" ? false : true
  });
  if (isLoading) {
    return <Loader />;
    }

    if (isError) {
    return <Error error="Couldn't fetch Events..." reset={() => refetch()} />;
    }
  return (
    <>
    <WizardModal showModal={showModal} setShowModal={setShowModal}/>
    { enabled ?
    <FullCalendar
    locale={frLocale}
    headerToolbar={buildToolbar()}
    events={data.events}
    plugins={[ dayGridPlugin, listPlugin, multiMonthPlugin ]}
    height={'100%'}
    initialView="dayGridMonth"
    /> : 
    <EmptyCalendar setShowModal={setShowModal}/>
    }
    </>
  );
};
