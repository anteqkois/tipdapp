"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.requestLogger = void 0;
var winston_1 = require("winston");
require("winston-daily-rotate-file");
var customFormatRequestConsole = winston_1.format.printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, url = _a.url, method = _a.method, host = _a.host;
    return "".concat(level, " - [").concat(label, "] ").concat(timestamp, " ").concat(method, " ").concat(host, " ").concat(url);
});
var customFormatRequestFile = winston_1.format.printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp, url = _a.url, method = _a.method, host = _a.host;
    return JSON.stringify({ level: level, timestamp: timestamp, message: message, method: method, host: host, url: url });
});
var fileRotateTransportRequest = new winston_1.transports.DailyRotateFile({
    filename: './.log/request-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '3d',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), customFormatRequestFile),
});
var requestLogger = (0, winston_1.createLogger)({
    level: 'info',
    defaultMeta: { service: 'server' },
    transports: [
        fileRotateTransportRequest,
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize({ colors: { info: 'blue', error: 'bold red' } }), winston_1.format.label({ label: 'REQUEST' }), winston_1.format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss',
            }), customFormatRequestConsole),
        }),
    ],
});
exports.requestLogger = requestLogger;
var customFormatErrorConsole = winston_1.format.printf(function (_a) {
    var _b;
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, rest = __rest(_a, ["level", "message", "label", "timestamp"]);
    return "".concat(level, " - [").concat((_b = rest.type) !== null && _b !== void 0 ? _b : message, "] ").concat(message, " ").concat(rest.stack);
});
var customFormatErrorFile = winston_1.format.printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp, rest = __rest(_a, ["level", "message", "timestamp"]);
    return JSON.stringify({ level: level, timestamp: timestamp, message: message, details: { type: rest.type, message: message, stack: rest.stack } });
});
var fileRotateTransportError = new winston_1.transports.DailyRotateFile({
    filename: './.log/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '3d',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), customFormatErrorFile),
});
var errorLogger = (0, winston_1.createLogger)({
    level: 'warn',
    defaultMeta: { service: 'server' },
    transports: [
        fileRotateTransportError,
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize({ colors: { warn: 'cyan', error: 'bold red' } }), winston_1.format.label({ label: 'ERROR' }), winston_1.format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss',
            }), customFormatErrorConsole),
        }),
    ],
});
exports.errorLogger = errorLogger;
