"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt")); // 암호화 모듈
const UserSchema = new mongoose_1.Schema({
    user_id: String,
    user_pw: String,
}, { timestamps: true });
UserSchema.methods.generateHash = function (user_pw) {
    return bcrypt_1.default.hashSync(user_pw, bcrypt_1.default.genSaltSync(16));
};
UserSchema.methods.validatePassword = function (user_pw) {
    return bcrypt_1.default.compareSync(user_pw, this.user_pw);
};
exports.default = mongoose_1.default.model('user', UserSchema);
