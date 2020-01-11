"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, user_pw } = req.body;
    const newUser = yield User_1.default.findOne({ user_id: user_id });
    if (!newUser) { // 신규 유저라면 
        yield new User_1.default({ user_id: user_id, user_pw: user_pw }).save();
        res.send({
            status: 200,
            message: "success!"
        });
    }
    else {
        res.send({
            status: 409,
            message: "username exist!"
        });
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = req.app.get('jwt-secret');
    const UserData = yield User_1.default.findOne({ user_id: req.body.user_id });
    if (!UserData) {
        res.send({
            status: 200,
            message: "ID faild!"
        });
    }
    else {
        if (UserData.user_pw !== req.body.user_pw) {
            res.send({
                status: 200,
                message: "password faild!"
            });
        }
        else {
            try {
                const token = yield jsonwebtoken_1.default.sign({
                    _id: UserData._id,
                    user_id: UserData.user_id
                }, secret, {
                    expiresIn: '7d',
                    issuer: 'velopert.com',
                    subject: 'userInfo'
                });
                res.send({
                    status: 200,
                    data: {
                        token: token
                    }
                });
            }
            catch (error) {
                next(error);
            }
        }
    }
}));
router.get('/check', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-access-token'] || req.query.token;
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        });
    }
    try {
        const data = yield jsonwebtoken_1.default.verify(token, req.app.get('jwt-secret'));
        res.send({
            status: 200,
            data: data
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
