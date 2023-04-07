import { z } from 'zod';

const EventScheme = z.object({
    id: z.string(),
    title: z.string(),
    start: z.string(),
    end: z.string()
});

export const EventsScheme = z.object({
  events: z.array(EventScheme)
});

export type EventType = z.infer<typeof EventScheme>;

