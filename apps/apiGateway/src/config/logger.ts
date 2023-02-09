import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const customFormatRequestConsole = format.printf(({ level, message, label, timestamp, url, method, host }) => {
  return `${level} - [${label}] ${timestamp} ${method} ${host} ${url}`;
});
const customFormatRequestFile = format.printf(({ level, message, timestamp, url, method, host }) => {
  return JSON.stringify({ level, timestamp, message, method, host, url });
});

const fileRotateTransportRequest = new transports.DailyRotateFile({
  filename: './.log/request-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '3d',
  format: format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss.SSS',
    }),
    customFormatRequestFile
  ),
});

const requestLogger = createLogger({
  level: 'info',
  defaultMeta: { service: 'server' },
  transports: [
    fileRotateTransportRequest,
    new transports.Console({
      format: format.combine(
        format.colorize({ colors: { info: 'blue', error: 'bold red' } }),
        format.label({ label: 'REQUEST' }),
        format.timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss.SSS',
        }),
        customFormatRequestConsole
      ),
    }),
    // new transports.File({
    //   dirname: './.log',
    //   filename: 'request.log',
    //   format: format.combine(
    //     format.timestamp({
    //       format: 'MMM-DD-YYYY HH:mm:ss',
    //     }),
    //     customFormatRequestFile,
    //   ),
    // }),
  ],
});

const customFormatErrorConsole = format.printf(({ level, message, label, timestamp, ...rest }) => {
  return `${level} - [${rest.type ?? message}] ${message} ${rest.stack}`;
});
const customFormatErrorFile = format.printf(({ level, message, timestamp, ...rest }) => {
  return JSON.stringify({ level, timestamp, message, details: { type: rest.type, message: message, stack: rest.stack } });
});

const fileRotateTransportError = new transports.DailyRotateFile({
  filename: './.log/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '3d',
  format: format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss.SSS',
    }),
    customFormatErrorFile
  ),
});

const errorLogger = createLogger({
  level: 'warn',
  defaultMeta: { service: 'server' },
  transports: [
    fileRotateTransportError,
    new transports.Console({
      format: format.combine(
        format.colorize({ colors: { warn: 'cyan', error: 'bold red' } }),
        format.label({ label: 'ERROR' }),
        format.timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss.SSS',
        }),
        customFormatErrorConsole
      ),
    }),
    // new transports.File({
    //   dirname: './.log',
    //   filename: 'error.log',
    //   format: format.combine(
    //     format.timestamp({
    //       format: 'MMM-DD-YYYY HH:mm:ss',
    //     }),
    //     customFormatErrorFile,
    //   ),
    // }),
  ],
});

export { requestLogger, errorLogger };
