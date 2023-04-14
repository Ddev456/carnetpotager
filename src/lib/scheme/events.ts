import { z } from 'zod';

const EventScheme = z.object({
    id: z.string(),
    title: z.string(),
    start: z.date(),
    // end: z.string(),
    extendedProps: z.object({ action: z.string().optional() })
});

export const EventsScheme = z.array(EventScheme);

export type EventType = z.infer<typeof EventScheme>;

