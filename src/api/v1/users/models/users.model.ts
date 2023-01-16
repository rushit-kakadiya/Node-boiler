import * as z from 'zod';

const OUser = z.object({
  fname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  roleKey: z.string(),
  isActive: z.boolean().default(false),
});

type User = z.infer<typeof OUser>;

export default User;
