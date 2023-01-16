import { model, Schema } from 'mongoose';
import User from '../models/users.model';
import bcrypt from 'bcryptjs';
import { SALT_WORK_FACTOR } from '../../../../util/Const';

const user = new Schema<User>(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    roleKey: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

user.pre('save', function (next) {
  let current = this;

  // only hash the password if it has been modified (or is new)
  if (!current.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
    if (error) return next(error);
    // hash the password using our new salt
    bcrypt.hash(current.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      current.password = hash;
      next();
    });
  });
});

user.methods.comparePassword = function (candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
};

const UsersSchema = model('users', user);

export default UsersSchema;
