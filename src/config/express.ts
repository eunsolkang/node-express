import express from "express";
import bodyParser from "body-parser";
import config from "./vars";
import routes from "../api/routes";
import logger from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as error from "./error";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup

app.use(cookieParser());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));

app.set('jwt-secret', config.secret);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(express.static("public"));

app.use("/v1", routes);
app.use(error.converter);
app.use(error.handler);
app.use(error.notFound);


export default app;
