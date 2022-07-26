import { Context, SQSEvent } from 'aws-lambda';
import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';
import { logger } from '@/application/config/LoggerConfig';
import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';

export const execute = async (event: SQSEvent, context: Context) => {
    logger.info('new event received');
    logger.info({ event, context });
    global.correlationId = context.awsRequestId;

    const analysisIndicatorDto = JSON.parse(JSON.parse(event?.Records[0]?.body)?.Message || '{}');

    const analysisIndicator = new AnalysisIndicator(analysisIndicatorDto);

    await DataDigestUseCase.digest(analysisIndicator);

    return true;
};
