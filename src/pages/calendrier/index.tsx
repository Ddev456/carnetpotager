import React from 'react';
import { Calendar } from '~/components/Calendar/Calendar';
import { type EventType } from '~/lib/scheme/events';
import { getAllEvents } from '~/server/event';

const Calendrier = ({events}: {events: EventType[]}) => {

  return (
    <>
        <Calendar events={events} /> 
    </>
  );
};


export async function getStaticProps() {
  const events = await getAllEvents();
  return { 
  props: { 
      events: JSON.parse(JSON.stringify(events)) 
      } 
  };
}

export default Calendrier;
