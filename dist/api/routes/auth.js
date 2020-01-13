"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.post('/signup', passport_1.default.authenticate('local-signup', { session: false }), (req, res) => {
    // 생성된 유저를 확인!
    res.json({
        user: req.user,
    });
});
router.get('/test', (req, res) => {
    // 생성된 유저를 확인!
    res.json({
        user: 'test'
    });
});
exports.default = router;
