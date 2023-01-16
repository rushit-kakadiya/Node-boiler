import * as z from 'zod';

const OPermissions = z.object({
  name: z.string(),
  description: z.string(),
  key: z.string(),
});

type Permissions = z.infer<typeof OPermissions>;

export default Permissions;
