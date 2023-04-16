import { prisma } from './db';

export const getAllPlants = async() => {
 const plants = await prisma.plants.findMany({
      orderBy: {
        name: 'asc',
      },});
    return plants;
    };