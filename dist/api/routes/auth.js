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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../../models/User"));
const validateBody_1 = require("../../modules/validateBody");
const getToken_1 = require("../../modules/getToken");
const router = express_1.Router();
router.post('/signup', validateBody_1.validateBody, passport_1.default.authenticate('local-signup', { session: false }), getToken_1.getToken);
router.post('/signin', validateBody_1.validateBody, passport_1.default.authenticate('local-signin', { session: false }), getToken_1.getToken);
router.post('/private', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    res.send({
        status: 200,
        data: req.user
    });
});
router.get('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        res.send({
            status: 500,
            data: users
        });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.remove({});
        res.send({
            status: 500,
            data: users
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
