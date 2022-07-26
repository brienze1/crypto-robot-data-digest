import { logger } from '@/application/config/LoggerConfig';
import LocalDateTime from '@/domain/utils/LocalDateTime';

describe('Logger config test', () => {
    let log: any;

    beforeEach(() => {
        log = {
            level: 'info',
            timestamp: LocalDateTime.now(),
            correlationId: undefined,
            transactionId: undefined,
            message: { message: 'test logger' },
        };
    });

    it('should test if logger is correctly configured', async () => {
        expect(global.correlationId).toEqual(undefined);
        expect(global.transactionId).toEqual(undefined);

        log.transactionId = global.transactionId;
        log.correlationId = global.correlationId;

        logger.info('test logger');

        expect(global.correlationId).not.toEqual(undefined);
        expect(global.transactionId).not.toEqual(undefined);
        expect(global.correlationId).not.toBe(global.transactionId);
    });
});
