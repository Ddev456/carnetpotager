import { prisma } from './db';

export const getAllVegetables = async() => {
 const vegetables = await prisma.vegetable.findMany({
      orderBy: {
        name: 'asc',
      },});
    return vegetables;
    };

export const getVegetable = (vegetableId: number) =>
  prisma.vegetable.findUniqueOrThrow({
    where: {
      id: vegetableId,
    },
    },
  );