import { Context, SQSEvent } from 'aws-lambda';

import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';
import { logger } from '@/application/config/LoggerConfig';
import { v4 } from 'uuid';
import AnalysisIndicatorsParse from '@/delivery/parse/AnalysisIndicatorParse';

export const execute = async (event: SQSEvent, context: Context) => {
    global.correlationId = context.awsRequestId;
    logger.info('new event received', event, context);

    const eventMessage = JSON.parse(JSON.parse(event?.Records[0]?.body)?.Message || '{}');

    const analysisIndicators = AnalysisIndicatorsParse.toAnalysisIndicator(eventMessage);

    DataDigestUseCase.digest();

    return true;
};
