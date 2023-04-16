import { z } from 'zod';

const PlantScheme = z.object({
    id: z.number(),
    // createdAt: z.string(),
    thumbnail: z.string().nullable(),
    name: z.string(),
    category: z.string(),
    family: z.string().nullable(),
    // gender: z.string(),
    // wikipedia: z.string(),
    seedling: z.string().nullable(),
    nursery: z.string().nullable(),
    plantation: z.string().nullable(),
    flowering: z.string().nullable(),
    harvesting: z.string().nullable(),
    harvest: z.string().nullable(),
    exposition: z.string().nullable(),
    water: z.number().nullable(),
    spaceBetween: z.number().nullable(),
    spaceOnRow: z.number().nullable(),
    level: z.number().nullable(),
    // seedMinTemp: z.number(),
    // seedMaxTemp: z.number(),
    seedDepth: z.number().nullable(),
    emergence: z.number().nullable(),
    // optimalTemp: z.number(),
    hardiness: z.number().nullable(),
    // nitrogenN: z.number(),
    // phosphorusP: z.number(),
    // potassiumK: z.number(),
    // conservation: z.number(),
    isHardiness: z.boolean().nullable(),
    // specie : z.string(),
});

export const PlantsScheme = z.object({
  plants: z.array(PlantScheme),
});

export type PlantType = z.infer<typeof PlantScheme>;

