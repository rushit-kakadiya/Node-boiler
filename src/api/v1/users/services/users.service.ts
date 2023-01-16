import User from '../models/users.model';
import UsersSchema from '../schemas/users.schema';

export const findAllUsers = async (filters = {}) => {
  const users: User[] = await UsersSchema.aggregate([
    { $match: filters },
    {
      $lookup: {
        from: 'roles',
        localField: 'roleKey',
        foreignField: 'key',
        as: 'role',
      },
    },
  ]).exec();
  return users;
};

export const saveUser = async (user: User) => {
  try {
    const userModel = new UsersSchema<User>({ ...user, isActive: false });
    const savedUser = await userModel.save();
    return savedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
