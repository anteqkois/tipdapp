import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const customFormatInfoConsole = format.printf(
  ({ level, message, label, timestamp, ...rest }) => `${level} - [${rest.type ?? message}] ${message} ${rest.stack}`,
);
const customFormatInfoFile = format.printf(({ level, message, timestamp, ...rest }) =>
  JSON.stringify({ level, timestamp, message, details: rest.details }),
);

const fileRotateTransportInfo = new transports.DailyRotateFile({
  filename: './.log/info-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '3d',
  format: format.combine(
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss.SSS',
    }),
    customFormatInfoFile,
  ),
});

const infoLogger = createLogger({
  level: 'info',
  defaultMeta: { service: process.env.npm_package_name ?? 'server' },
  transports: [
    fileRotateTransportInfo,
    new transports.Console({
      format: format.combine(
        format.colorize({ colors: { info: 'bold blue' } }),
        format.label({ label: 'INFO' }),
        format.timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss.SSS',
        }),
        customFormatInfoConsole,
      ),
    }),
    // new transports.File({
    //   dirname: './.log',
    //   filename: 'error.log',
    //   format: format.combine(
    //     format.timestamp({
    //       format: 'MMM-DD-YYYY HH:mm:ss',
    //     }),
    //     customFormatInfoFile,
    //   ),
    // }),
  ],
});

export { infoLogger };
