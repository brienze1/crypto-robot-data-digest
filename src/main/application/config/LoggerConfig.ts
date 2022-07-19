import winston from 'winston';

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
    ),
    defaultMeta: {
        correlationId: global.correlationId,
        transactionId: global.transactionId,
    },
    transports: [
        new winston.transports.Console(),
    ],
});
