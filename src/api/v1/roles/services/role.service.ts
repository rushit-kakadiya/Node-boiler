import Role from '../models/roles.model';
import RolesSchema from '../schemas/roles.schema';

export const saveRole = async (role: Role) => {
  const roleModel = new RolesSchema<Role>({ ...role });
  const savedRole = await roleModel.save();
  return savedRole;
};
