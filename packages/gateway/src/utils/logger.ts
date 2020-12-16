import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.printf((info) => {
      const { timestamp, level, message, ...args } = info;

      let msg = message;

      if (typeof message === "object") {
        msg = JSON.stringify(message);
      }
      return `${timestamp} [${level}]: ${msg} ${
        Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
      }`;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;
