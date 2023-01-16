import logger from '../helpers/logger.helper';
import Permissions from './v1/roles/models/permission.model';
import Role from './v1/roles/models/roles.model';
import PermissionsSchema from './v1/roles/schemas/permission.schema';
import RolesSchema from './v1/roles/schemas/roles.schema';
import User from './v1/users/models/users.model';
import UsersSchema from './v1/users/schemas/users.schema';

export const generatePermissions = async () => {
  const permissions: Permissions[] = [
    {
      name: 'Create Event',
      description: 'Permission that allows user to create events',
      key: 'create_event',
    },
    {
      name: 'Delete Event',
      description: 'Permission that allows user to delete events',
      key: 'delete_event',
    },
    {
      name: 'show_orders',
      description: 'Permission that allows user to list orders',
      key: 'show_orders',
    },
    {
      name: 'delete_orders',
      description: 'Permission that allows user to delete orders',
      key: 'delete_orders',
    },
  ];
  permissions.forEach(async (permission) => {
    try {
      const permissionModel = new PermissionsSchema<Permissions>({ ...permission });
      await permissionModel.save();
    } catch (error: any) {
      logger.error(error.message);
    }
  });
};

export const generateAdminRole = async () => {
  try {
    const roleModel = new RolesSchema<Role>({
      name: 'Admin',
      description: 'Role for admin users',
      key: 'admin',
      permissionKeys: ['create_event', 'delete_event', 'show_orders', 'delete_orders'],
    });
    await roleModel.save();
  } catch (error: any) {
    logger.error(error.message);
  }
};

export const generateAdminUser = async () => {
  try {
    const userModel = new UsersSchema<User>({
      isActive: true,
      roleKey: 'admin',
      fname: 'Super',
      lname: 'admin',
      email: 'admin@eventmanager.com',
      password: 'Test@1234',
    });
    await userModel.save();
  } catch (error: any) {
    logger.error(error.message);
  }
};
