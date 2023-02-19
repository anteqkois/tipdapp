import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const customFormatErrorConsole = format.printf(
  ({ level, message, label, timestamp, ...rest }) => `${level} - [${rest.type ?? label}] ${message} ${rest.stack}`,
);
const customFormatErrorFile = format.printf(({ level, message, timestamp, ...rest }) =>
  JSON.stringify({ level, timestamp, message, details: { type: rest.type, message, stack: rest.stack } }),
);

const fileRotateTransportError = new transports.DailyRotateFile({
  filename: './.log/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '3d',
  format: format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss.SSS',
    }),
    customFormatErrorFile,
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
        customFormatErrorConsole,
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

export { errorLogger };
