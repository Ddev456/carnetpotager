import { prisma } from './db';

export const getAllEvents = async() => {
 const events = await prisma.event.findMany({
      orderBy: {
        start: 'asc',
      },});
    return events;
    };