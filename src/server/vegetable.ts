import { prisma } from './db';

export const getAllVegetables = async(page = 0) => {
 const vegetables = await prisma.vegetable.findMany({
      skip: page * 10,
      take: 10,
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