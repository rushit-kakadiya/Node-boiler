import * as z from 'zod';

const OTicket = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  eventId: z.any(),
});

type Ticket = z.infer<typeof OTicket>;

export default Ticket;
