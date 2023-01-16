import * as z from 'zod';

const OEvents = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  poster: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

type Events = z.infer<typeof OEvents>;

export default Events;
