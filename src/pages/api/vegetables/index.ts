import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../server/handler';
import { getAllPlants } from '../../../server/plants';
import { z } from 'zod'; 

const PageParams = z.object({
  page: z
    .string()
    .transform((s) => Number(s))
    .optional(),
  error: z.string().optional(), // for testing purpose
});

export default apiHandler({
  endpoints: {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const params = PageParams.parse(req.query);
      const page = params.page ?? 0;
      const error = params.error; // for testing purpose
      const vegetables = await getAllPlants();

      res.status(200).json({
        vegetables: error ? vegetables.map(() => error) : vegetables, // for testing purpose
        nextPage: vegetables.length !== 0 ? page + 1 : null,
      });
    },
  },
});