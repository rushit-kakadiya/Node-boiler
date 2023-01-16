import * as z from 'zod';

const OOrder = z.object({
  owner: z.any(),
  tickets: z.any(),
  date: z.date(),
  quantity: z.number(),
  totalPrice: z.number(),
});

type Order = z.infer<typeof OOrder>;

export default Order;
