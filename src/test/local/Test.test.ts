import * as handler from '@/delivery/handler/Handler';
import { Context, SQSEvent } from 'aws-lambda';
import { logger } from '@/application/config/LoggerConfig';

const event: SQSEvent = {
    Records: [{
        attributes: {
            ApproximateFirstReceiveTimestamp: '1658342181290',
            ApproximateReceiveCount: '1',
            SenderId: '000000000000',
            SentTimestamp: '1658342180397'
        },
        awsRegion: 'sa-east-1',
        body: `{
          "Type": "Notification",
          "MessageId": "60f5623c-6d4b-4cb3-bd42-5ff76d397a90",
          "TopicArn": "arn:aws:sns:sa-east-1:000000000000:cryptoAnalysisTopic",
          "Message": "{\\\"interval\\\":\\\"SIX_HOURS\\\",\\\"analysisData\\\":{\\\"simpleMovingAverages\\\":[{\\\"period\\\":5,\\\"value\\\":21720.034,\\\"indicator\\\":\\\"NEUTRAL\\\"},{\\\"period\\\":10,\\\"value\\\":21477.829,\\\"indicator\\\":\\\"NEUTRAL\\\"},{\\\"period\\\":20,\\\"value\\\":21011.074,\\\"indicator\\\":\\\"STRONG_BUY\\\"},{\\\"period\\\":50,\\\"value\\\":20840.5982,\\\"indicator\\\":\\\"BUY\\\"},{\\\"period\\\":100,\\\"value\\\":20521.7347,\\\"indicator\\\":\\\"BUY\\\"},{\\\"period\\\":200,\\\"value\\\":23285.4764,\\\"indicator\\\":\\\"NEUTRAL\\\"}],\\\"exponentialMovingAverages\\\":[{\\\"period\\\":5,\\\"value\\\":21480.44981,\\\"indicator\\\":\\\"NEUTRAL\\\"},{\\\"period\\\":10,\\\"value\\\":21219.48731,\\\"indicator\\\":\\\"BUY\\\"},{\\\"period\\\":20,\\\"value\\\":20778.21281,\\\"indicator\\\":\\\"BUY\\\"},{\\\"period\\\":50,\\\"value\\\":20619.44775,\\\"indicator\\\":\\\"NEUTRAL\\\"},{\\\"period\\\":100,\\\"value\\\":20698.25329,\\\"indicator\\\":\\\"STRONG_BUY\\\"},{\\\"period\\\":200,\\\"value\\\":25140.26348,\\\"indicator\\\":\\\"NEUTRAL\\\"}]}}",
          "Timestamp": "2022-07-20T18:36:20.388Z",
          "SignatureVersion": "1",
          "Signature": "EXAMPLEpH+..",
          "SigningCertURL": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-0000000000000000000000.pem",
          "UnsubscribeURL": "http://localhost:4566/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:sa-east-1:000000000000:cryptoAnalysisTopic:900ed440-52d5-4328-b731-fa80ad72110d"
        }`,
        eventSource: 'aws:sqs',
        eventSourceARN: 'arn:aws:sqs:sa-east-1:000000000000:cryptoAnalysisQueue',
        md5OfBody: '9ee374a1d9253707d2a679f092519091',
        messageAttributes: {},
        messageId: 'f0369cb0-40b9-4dae-a4f8-1c0c8d43b079',
        receiptHandle: 'ZjlkN2E3N2QtNzA5Ni00MzE4LWI2YjAtZjUxZDU1MWUyODJjIGFybjphd3M6c3FzOnNhLWVhc3QtMTowMDAwMDAwMDAwMDA6Y3J5cHRvQW5hbHlzaXNRdWV1ZSBmMDM2OWNiMC00MGI5LTRkYWUtYTRmOC0xYzBjOGQ0M2IwNzkgMTY1ODM0MjE4MS4yOTA5MzMx',
    }]
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
    done(error?: Error, result?: any): void {
    },
    fail(error: Error | string): void {
    },
    getRemainingTimeInMillis(): number {
        return 0;
    },
    succeed(message: any, object?: any): void {
    }
};

const response = handler.execute(event, context);

logger.info(response);
