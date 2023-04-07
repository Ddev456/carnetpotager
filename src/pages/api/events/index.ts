import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../server/handler';
import { getAllEvents } from '../../../server/event';
import { z } from 'zod'; 

const PageParams = z.object({
  error: z.string().optional(), // for testing purpose
});

export default apiHandler({
  endpoints: {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const params = PageParams.parse(req.query);
      const error = params.error; // for testing purpose
      const events = await getAllEvents();

      res.status(200).json({
        events: error ? events.map(() => error) : events
      });
    },
  },
});