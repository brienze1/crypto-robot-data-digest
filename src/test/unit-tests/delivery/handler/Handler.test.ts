import * as Handler from '@/delivery/handler/Handler';
import { Context, SQSEvent } from 'aws-lambda';
import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';
import { logger } from '@/application/config/LoggerConfig';
import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';
import mocked = jest.mocked;

jest.mock('@/application/config/LoggerConfig');
const loggerMock = mocked(logger, true);

jest.mock('@/domain/usecase/DataDigestUseCase');
const DataDigestUseCaseMock = mocked(DataDigestUseCase, true);

describe('Handler test', () => {
    let event: SQSEvent;
    let context: Context;
    let analysisIndicator: AnalysisIndicator;

    beforeEach(() => {
        event = {
            Records: [
                {
                    attributes: {
                        ApproximateFirstReceiveTimestamp: '1658342181290',
                        ApproximateReceiveCount: '1',
                        SenderId: '000000000000',
                        SentTimestamp: '1658342180397',
                    },
                    awsRegion: 'sa-east-1',
                    body: '{"interval":"ONE_DAY","timestamp":"2022-07-22T11:47:33","analysisData":{"simpleMovingAverages":[{"period":"FIVE","value":22479.07200,"indicator":"NEUTRAL"},{"period":"TEN","value":21457.34600,"indicator":"BUY"},{"period":"TWENTY","value":20987.83950,"indicator":"BUY"},{"period":"FIFTY","value":22815.01820,"indicator":"NEUTRAL"},{"period":"HUNDRED","value":28716.17480,"indicator":"NEUTRAL"},{"period":"TWO_HUNDRED","value":35075.66910,"indicator":"NEUTRAL"}],"exponentialMovingAverages":[{"period":"FIVE","value":22094.03041,"indicator":"NEUTRAL"},{"period":"TEN","value":21009.22521,"indicator":"BUY"},{"period":"TWENTY","value":20475.42766,"indicator":"BUY"},{"period":"FIFTY","value":24912.26174,"indicator":"NEUTRAL"},{"period":"HUNDRED","value":32123.80436,"indicator":"NEUTRAL"},{"period":"TWO_HUNDRED","value":38738.82237,"indicator":"NEUTRAL"}]}}',
                    eventSource: 'aws:sqs',
                    eventSourceARN: 'arn:aws:sqs:sa-east-1:000000000000:cryptoAnalysisQueue',
                    md5OfBody: '9ee374a1d9253707d2a679f092519091',
                    messageAttributes: {},
                    messageId: 'f0369cb0-40b9-4dae-a4f8-1c0c8d43b079',
                    receiptHandle:
                        'ZjlkN2E3N2QtNzA5Ni00MzE4LWI2YjAtZjUxZDU1MWUyODJjIGFybjphd3M6c3FzOnNhLWVhc3QtMTowMDAwMDAwMDAwMDA6Y3J5cHRvQW5' +
                        'hbHlzaXNRdWV1ZSBmMDM2OWNiMC00MGI5LTRkYWUtYTRmOC0xYzBjOGQ0M2IwNzkgMTY1ODM0MjE4MS4yOTA5MzMx',
                },
            ],
        };

        context = {
            awsRequestId: '011cf9ab-24be-140b-a627-fa74828b65fd',
            callbackWaitsForEmptyEventLoop: true,
            functionName: 'dataDigestLambda',
            functionVersion: '$LATEST',
            invokedFunctionArn: 'arn:aws:lambda:sa-east-1:000000000000:function:dataDigestLambda',
            logGroupName: '/aws/lambda/dataDigestLambda',
            logStreamName: '2022/07/20/[$LATEST]aa635465c6d543869ec4428f0b19b123',
            memoryLimitInMB: '1536',
            done(): void {},
            fail(): void {},
            getRemainingTimeInMillis(): number {
                return 0;
            },
            succeed(): void {},
        };

        const analysisIndicatorDto = JSON.parse(event?.Records[0]?.body) || '{}';

        analysisIndicator = new AnalysisIndicator(analysisIndicatorDto);
    });

    it('should handle event input with success', async () => {
        expect(global.correlationId).toEqual(undefined);

        const response = await Handler.execute(event, context);

        expect(global.correlationId).toEqual(context.awsRequestId);
        expect(loggerMock.info).toHaveBeenCalledTimes(1);
        expect(loggerMock.info).toHaveBeenCalledWith('new event received', event, context);
        expect(DataDigestUseCaseMock.digest).toHaveBeenCalledTimes(1);
        expect(DataDigestUseCaseMock.digest).toHaveBeenCalledWith(analysisIndicator);
        expect(response).toEqual(true);
    });
});
