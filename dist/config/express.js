"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const vars_1 = __importDefault(require("./vars"));
const routes_1 = __importDefault(require("../api/routes"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const error = __importStar(require("./error"));
const passport_1 = __importDefault(require("passport"));
require("../passport/local-signup");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// view engine setup
app.use(cookie_parser_1.default());
app.use(express_session_1.default({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
    }
}));
app.set('jwt-secret', vars_1.default.secret);
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(helmet_1.default());
app.use(express_1.default.static("public"));
app.use(passport_1.default.initialize());
app.use("/v1", routes_1.default);
app.use(error.converter);
app.use(error.handler);
app.use(error.notFound);
exports.default = app;
