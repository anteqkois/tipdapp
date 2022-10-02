import { createLogger, format, transports } from 'winston';

const requestLogger = createLogger({
  // level: 'info',
  format: format.json(),
  defaultMeta: { service: 'backend' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ dirname: './.log', filename: 'requestError.log', level: 'error' }),
    new transports.File({ dirname: './.log', filename: 'request.log' }),
  ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

const customFormat = format.printf(({ level, message, label, timestamp, url, method, host }) => {
  return `[${label}] ${level}: ${method} ${host} ${url}`;
  // return `${timestamp} [${label}] ${level}: ${message}`;
});

if (process.env.NODE_ENV !== 'production') {
  requestLogger.add(
    new transports.Console({
      format: format.combine(
        format.colorize({ colors: { info: 'blue', error: 'red' } }),
        format.label({ label: 'REQUEST' }),
        format.timestamp(),
        customFormat,
      ),
    }),
  );
}

export { requestLogger };
