import * as z from 'zod';

const ORole = z.object({
  name: z.string(),
  permissionKeys: z.array(z.string()),
  description: z.string(),
  key: z.string(),
});

type Role = z.infer<typeof ORole>;

export default Role;
