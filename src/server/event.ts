import { prisma } from './db';

export const getAllEvents = async() => {
 const nativesEvents = await prisma.nativesEvents.findMany();
    return nativesEvents;
    };