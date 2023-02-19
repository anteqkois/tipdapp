import { NextFunction, Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const customFormatRequestConsole = format.printf(
  ({ level, label, timestamp, url, method, host }) => `${level} - [${label}] ${timestamp} ${method} ${host} ${url}`,
);
const customFormatRequestFile = format.printf(({ level, message, timestamp, url, method, host }) =>
  JSON.stringify({ level, timestamp, message, method, host, url }),
);

const fileRotateTransportRequest = new transports.DailyRotateFile({
  filename: './.log/request-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '3d',
  format: format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss.SSS',
    }),
    customFormatRequestFile,
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
        customFormatRequestConsole,
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

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  requestLogger.info('incoming request', {
    url: req.originalUrl,
    method: req.method,
    host: req.hostname,
  });
  next();
};


export { requestLogger, logRequest };
