"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vars_1 = __importDefault(require("./vars"));
const http_status_1 = __importDefault(require("http-status"));
class ExtendableError extends Error {
    constructor({ message, errors, status, isPublic, stack }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        this.stack = stack;
        // Error.captureStackTrace(this, this.constructor.name);
    }
}
class APIError extends ExtendableError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor({ message, errors = undefined, stack = undefined, status = http_status_1.default.INTERNAL_SERVER_ERROR, isPublic = false }) {
        super({
            message,
            errors,
            status,
            isPublic,
            stack
        });
    }
}
exports.APIError = APIError;
exports.converter = (err, req, res, next) => {
    let convertedError = err;
    if (!(err instanceof APIError)) {
        convertedError = new APIError({
            message: err.message,
            status: err.status,
            stack: err.stack
        });
    }
    return exports.handler(convertedError, req, res);
};
exports.handler = (err, req, res, next) => {
    console.log(err);
    const response = {
        code: err.status,
        message: err.message || http_status_1.default[err.status],
        errors: err.errors,
        stack: err.stack
    };
    if (vars_1.default.env !== "development") {
        delete response.stack;
    }
    res.status(err.status);
    res.json(response);
};
exports.notFound = (req, res, next) => {
    const err = new APIError({
        message: "Not found",
        status: http_status_1.default.NOT_FOUND
    });
    return exports.handler(err, req, res);
};
