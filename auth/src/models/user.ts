import mongoose from 'mongoose';
import { Password } from './../services/password';
// attributes needed to create User
interface IUser {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(props: IUser): UserDoc;
}

//User Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});
userSchema.statics.build = (props: IUser) => {
  return new User(props);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };