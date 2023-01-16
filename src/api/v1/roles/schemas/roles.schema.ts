import { model, Schema } from 'mongoose';
import Role from '../models/roles.model';

const role = new Schema<Role>(
  {
    name: { type: String, required: true },
    permissionKeys: { type: [String], required: true },
    description: { type: String, required: true },
    key: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const RolesSchema = model('roles', role);

export default RolesSchema;
