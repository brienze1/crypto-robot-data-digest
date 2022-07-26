import winston from 'winston';
import { v4 } from 'uuid';

const myFormat = winston.format.printf(({ level, label, timestamp, ...message }) => {
    if (!global.correlationId) {
        global.correlationId = v4();
    }
    if (!global.transactionId) {
        global.transactionId = v4();
    }

    return JSON.stringify({
        level,
        label,
        timestamp,
        correlationId: global.correlationId,
        transactionId: global.transactionId,
        data: message,
    });
});

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        myFormat
    ),
    transports: [new winston.transports.Console()],
});
