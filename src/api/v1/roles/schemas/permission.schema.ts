import { model, Schema } from 'mongoose';
import Permissions from '../models/permission.model';

const permission = new Schema<Permissions>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    key: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

const PermissionsSchema = model('permissions', permission);

export default PermissionsSchema;
