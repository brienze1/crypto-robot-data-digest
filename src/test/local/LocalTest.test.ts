import * as handler from '@/delivery/handler/Handler';
import { Context, SQSEvent } from 'aws-lambda';
import { logger } from '@/application/config/LoggerConfig';

const event: SQSEvent = {
    Records: [
        {
            attributes: {
                ApproximateFirstReceiveTimestamp: '1658342181290',
                ApproximateReceiveCount: '1',
                SenderId: '000000000000',
                SentTimestamp: '1658342180397',
            },
            awsRegion: 'sa-east-1',
            body: `
                {
                    "Type": "Notification", 
                    "MessageId": "41cf51ea-1a79-4864-9132-b15c8dd040cd", 
                    "TopicArn": "arn:aws:sns:sa-east-1:000000000000:cryptoAnalysisTopic", 
                    "Message": "{\\"interval\\":\\"ONE_DAY\\",\\"analysisData\\":{\\"simpleMovingAverages\\":[{\\"period\\":\\"FIVE\\",\\"value\\":22479.07200,\\"indicator\\":\\"NEUTRAL\\"},{\\"period\\":\\"TEN\\",\\"value\\":21457.34600,\\"indicator\\":\\"BUY\\"},{\\"period\\":\\"TWENTY\\",\\"value\\":20987.83950,\\"indicator\\":\\"BUY\\"},{\\"period\\":\\"FIFTY\\",\\"value\\":22815.01820,\\"indicator\\":\\"NEUTRAL\\"},{\\"period\\":\\"HUNDRED\\",\\"value\\":28716.17480,\\"indicator\\":\\"NEUTRAL\\"},{\\"period\\":\\"TWO_HUNDRED\\",\\"value\\":35075.66910,\\"indicator\\":\\"NEUTRAL\\"}],\\"exponentialMovingAverages\\":[{\\"period\\":\\"FIVE\\",\\"value\\":22094.03041,\\"indicator\\":\\"NEUTRAL\\"},{\\"period\\":\\"TEN\\",\\"value\\":21009.22521,\\"indicator\\":\\"BUY\\"},{\\"period\\":\\"TWENTY\\",\\"value\\":20475.42766,\\"indicator\\":\\"BUY\\"},{\\"period\\":\\"FIFTY\\",\\"value\\":24912.26174,\\"indicator\\":\\"NEUTRAL\\"},{\\"period\\":\\"HUNDRED\\",\\"value\\":32123.80436,\\"indicator\\":\\"NEUTRAL\\"},{\\"period\\":\\"TWO_HUNDRED\\",\\"value\\":38738.82237,\\"indicator\\":\\"NEUTRAL\\"}]}}", 
                    "Timestamp": "2022-07-21T14:58:58.971Z", 
                    "SignatureVersion": "1", 
                    "Signature": "EXAMPLEpH+..", 
                    "SigningCertURL": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-0000000000000000000000.pem", 
                    "UnsubscribeURL": "http://localhost:4566/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:sa-east-1:000000000000:cryptoAnalysisTopic:d141d0ea-1ae4-4a94-88cf-e9394155c697"
                }`,
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

const context: Context = {
    awsRequestId: '011cf9ab-24be-140b-a627-fa74828b65fd',
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'dataDigestLambda',
    functionVersion: '$LATEST',
    invokedFunctionArn: 'arn:aws:lambda:sa-east-1:000000000000:function:dataDigestLambda',
    logGroupName: '/aws/lambda/dataDigestLambda',
    logStreamName: '2022/07/20/[$LATEST]aa635465c6d543869ec4428f0b19b123',
    memoryLimitInMB: '1536',
    done(error?: Error, result?: any): void {},
    fail(error: Error | string): void {},
    getRemainingTimeInMillis(): number {
        return 0;
    },
    succeed(message: any, object?: any): void {},
};

const response = handler.execute(event, context);

logger.info(response);
