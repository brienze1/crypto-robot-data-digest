import { Context, SQSEvent } from 'aws-lambda';
import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';
import { logger } from '@/application/config/LoggerConfig';
import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';

export const execute = async (event: SQSEvent, context: Context) => {
    global.correlationId = context.awsRequestId;
    logger.info('new event received', event, context);

    const analysisIndicatorDto = JSON.parse(event?.Records[0]?.body);

    const analysisIndicator = new AnalysisIndicator(analysisIndicatorDto);

    await DataDigestUseCase.digest(analysisIndicator);

    return true;
};
