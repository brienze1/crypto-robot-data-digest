import { Context, SQSEvent } from 'aws-lambda';

import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';
import { logger } from '@/application/config/LoggerConfig';
import { v4 } from 'uuid';

export const execute = async (event: SQSEvent, context: Context) => {
    global.correlationId = context.awsRequestId;
    global.transactionId = v4();
    logger.info('---------------START---------------');
    logger.info('EVENT OCCURRED!');
    logger.info(event);
    logger.info(context);
    logger.info('---------------END---------------');
    logger.info(process.env.PORT);

    DataDigestUseCase.digest();

    return true;
};
