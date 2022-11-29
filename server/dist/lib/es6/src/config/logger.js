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
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
var customFormatRequestConsole = format.printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, url = _a.url, method = _a.method, host = _a.host;
    return "".concat(level, " - [").concat(label, "] ").concat(timestamp, " ").concat(method, " ").concat(host, " ").concat(url);
});
var customFormatRequestFile = format.printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp, url = _a.url, method = _a.method, host = _a.host;
    return JSON.stringify({ level: level, timestamp: timestamp, message: message, method: method, host: host, url: url });
});
var fileRotateTransportRequest = new transports.DailyRotateFile({
    filename: './.log/request-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '3d',
    format: format.combine(format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), customFormatRequestFile),
});
var requestLogger = createLogger({
    level: 'info',
    defaultMeta: { service: 'server' },
    transports: [
        fileRotateTransportRequest,
        new transports.Console({
            format: format.combine(format.colorize({ colors: { info: 'blue', error: 'bold red' } }), format.label({ label: 'REQUEST' }), format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss',
            }), customFormatRequestConsole),
        }),
    ],
});
var customFormatErrorConsole = format.printf(function (_a) {
    var _b;
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp, rest = __rest(_a, ["level", "message", "label", "timestamp"]);
    return "".concat(level, " - [").concat((_b = rest.type) !== null && _b !== void 0 ? _b : message, "] ").concat(message, " ").concat(rest.stack);
});
var customFormatErrorFile = format.printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp, rest = __rest(_a, ["level", "message", "timestamp"]);
    return JSON.stringify({ level: level, timestamp: timestamp, message: message, details: { type: rest.type, message: message, stack: rest.stack } });
});
var fileRotateTransportError = new transports.DailyRotateFile({
    filename: './.log/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '3d',
    format: format.combine(format.timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
    }), customFormatErrorFile),
});
var errorLogger = createLogger({
    level: 'warn',
    defaultMeta: { service: 'server' },
    transports: [
        fileRotateTransportError,
        new transports.Console({
            format: format.combine(format.colorize({ colors: { warn: 'cyan', error: 'bold red' } }), format.label({ label: 'ERROR' }), format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss',
            }), customFormatErrorConsole),
        }),
    ],
});
export { requestLogger, errorLogger };
