import mongoose, { Schema } from "mongoose";

export interface UserModel extends mongoose.Document {
  user_id : String;
  user_pw : String;
  admin : Boolean;
}
const UserSchema: Schema<UserModel> = new Schema({
    user_id: String,
    user_pw: String,
    admin : { type: Boolean, default: false }
});

export default  mongoose.model('user', UserSchema);
