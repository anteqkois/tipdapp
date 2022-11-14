import { createLogger, format, transports } from 'winston';

const requestLogger = createLogger({
  // level: 'info',
  format: format.json(),
  defaultMeta: { service: 'backend' },
  transports: [
    new transports.File({ dirname: './.log', filename: 'requestError.log', level: 'error' }),
    new transports.File({ dirname: './.log', filename: 'request.log' }),
  ],
});

const customFormat = format.printf(({ level, message, label, timestamp, url, method, host }) => {
  return `[${label}] ${level}: ${method} ${host} ${url}`;
  // return `${timestamp} [${label}] ${level}: ${message}`;
});

if (process.env.NODE_ENV === 'production') {
  requestLogger.add(new transports.File({ dirname: './.log', filename: 'requestError.log', level: 'error' }));
  requestLogger.add(new transports.File({ dirname: './.log', filename: 'request.log' }));
} else {
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
