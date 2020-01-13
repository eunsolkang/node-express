import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt' // 암호화 모듈

export interface UserModel extends mongoose.Document {
  user_id : String;
  user_pw : String;
}
const UserSchema: Schema<UserModel> = new Schema({
    user_id: String,
    user_pw: String,
},{ timestamps: true } );

UserSchema.methods.generateHash = function(user_pw: string): string {
  return bcrypt.hashSync(user_pw, bcrypt.genSaltSync(16))
}

UserSchema.methods.validatePassword = function(user_pw: string): boolean {
  return bcrypt.compareSync(user_pw, this.user_pw)
}

export default  mongoose.model('user', UserSchema);
