import { z } from 'zod';

const VegetableScheme = z.object({
    id: z.number(),
    createdAt: z.string(),
    icon: z.string(),
    name: z.string(),
    category: z.string(),
    level: z.number(),
    // wikipedia: z.string(),
    seedling: z.string(),
    selterSeedling: z.string(),
    plantation: z.string(),
    flowering: z.string(),
    harvest: z.string(),
    exposition: z.string(),
    water: z.number(),
    spaceBetween: z.number(),
    spaceOnRow: z.number(),
    // seedMinTemp: z.number(),
    // seedMaxTemp: z.number(),
    seedDepth: z.number(),
    emergence: z.number(),
    // optimalTemp: z.number(),
    hardiness: z.number(),
    isHardiness: z.boolean(),
    // nitrogenN: z.number(),
    // phosphorusP: z.number(),
    // potassiumK: z.number(),
    family: z.string(),
    // gender: z.string(),
    // specie : z.string(),
});

export const VegetablesScheme = z.object({
  vegetables: z.array(VegetableScheme),
  nextPage: z.number().optional().nullable(),
});

export type VegetableType = z.infer<typeof VegetableScheme>;

