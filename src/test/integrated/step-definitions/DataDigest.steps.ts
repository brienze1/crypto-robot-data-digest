import { after, before, binding, given, then, when } from 'cucumber-tsflow';
import { defineParameterType, setDefaultTimeout } from '@cucumber/cucumber';
import * as fs from 'fs';
import { Context, SNSMessage, SQSEvent } from 'aws-lambda';
import { AnalyzedDataDto } from '@/integration/dto/AnalyzedDataDto';
import * as Handler from '@/delivery/handler/Handler';
import { assert } from 'chai';
import { AnalyzedDataRepository } from '@/integration/repository/AnalyzedDataRepository';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { logger } from '@/application/config/LoggerConfig';
import sinon from 'sinon';
import { AnalysisSummary } from '@/domain/model/AnalysisSummary';

defineParameterType({
    name: 'boolean',
    regexp: /true|false/,
    transformer(s) {
        return s === 'true';
    },
});

let eventMessage: any;
let handlerResponse: boolean;
let publishSpy: any;
let analyzedDataDtoSet: AnalyzedDataDto[];
let analyzedDataRepositoryUpdateMock: any;
let analyzedDataRepositoryScanMock: any;

@binding()
export class DataDigestSteps {
    @before()
    async before(): Promise<void> {
        setDefaultTimeout(60 * 10000);

        AWSMock.setSDKInstance(AWS);

        publishSpy = sinon.spy();

        AWSMock.mock('SNS', 'publish', publishSpy);
    }

    @after()
    async after() {
        AWSMock.restore('SNS');

        publishSpy = undefined;

        analyzedDataRepositoryUpdateMock.restore();
        analyzedDataRepositoryScanMock.restore();
    }

    @given('DynamoDB analyzedData table is empty')
    async dynamoDBAnalyzedDataTableIsEmpty() {
        analyzedDataDtoSet = [];

        analyzedDataRepositoryUpdateMock = sinon
            .stub(AnalyzedDataRepository, 'update')
            .callsFake((analyzedDataDto: Partial<AnalyzedDataDto>) => {
                if (analyzedDataDto instanceof AnalyzedDataDto) {
                    analyzedDataDtoSet.push(analyzedDataDto);
                }
            });

        // @ts-ignore
        analyzedDataRepositoryScanMock = sinon.stub(AnalyzedDataRepository, 'scan').callsFake(() => ({
            exec: sinon.stub().resolves(analyzedDataDtoSet),
        }));
    }

    @given('The following analysis data was received {string}')
    theFollowingAnalysisDataWasReceived(jsonFile: string) {
        eventMessage = DataDigestSteps.getJsonFile(jsonFile);
    }

    @when('The handler function gets called')
    async theHandlerFunctionGetsCalled() {
        const snsMessage = DataDigestSteps.generateSNSMessage(eventMessage);

        const sqsEvent = DataDigestSteps.generateSQSEvent(snsMessage);

        const context = DataDigestSteps.generateContext();

        handlerResponse = await Handler.execute(sqsEvent, context);
    }

    @then('The following analyzed data should be stored in DynamoDB {string}')
    async theFollowingAnalyzedDataShouldBeStoredInDynamoDB(jsonFile: string) {
        const expectedAnalyzedDataDto: AnalyzedDataDto = DataDigestSteps.getJsonFile(jsonFile);

        assert.isTrue(analyzedDataRepositoryUpdateMock.calledOnce);
        assert.isTrue(analyzedDataRepositoryScanMock.calledOnce);
        assert.deepEqual(analyzedDataDtoSet[0].interval, expectedAnalyzedDataDto.interval);
        assert.deepEqual(analyzedDataDtoSet[0].summary, expectedAnalyzedDataDto.summary);
        assert.deepEqual(analyzedDataDtoSet[0].analysis[0], expectedAnalyzedDataDto.analysis[0]);
        assert.deepEqual(analyzedDataDtoSet[0].analysis[1], expectedAnalyzedDataDto.analysis[1]);
    }

    @then('The following analyzed data should be sent out via SNS event {string}')
    theFollowingAnalyzedDataShouldBeSentOutViaSNSEvent(jsonPath: string) {
        const analysisSummary: AnalysisSummary = DataDigestSteps.getJsonFile(jsonPath);

        assert.isTrue(publishSpy.calledOnce);

        const messageSent: AnalysisSummary = JSON.parse(publishSpy.getCall(0).args[0].Message);

        assert.equal(messageSent.analyzedData[0].analysis[0].metric, analysisSummary.analyzedData[0].analysis[0].metric);
        assert.equal(messageSent.analyzedData[0].analysis[0].indicator, analysisSummary.analyzedData[0].analysis[0].indicator);
        assert.equal(
            messageSent.analyzedData[0].analysis[0].score.buyCount,
            analysisSummary.analyzedData[0].analysis[0].score.buyCount
        );
        assert.equal(
            messageSent.analyzedData[0].analysis[0].score.sellCount,
            analysisSummary.analyzedData[0].analysis[0].score.sellCount
        );
        assert.equal(messageSent.analyzedData[0].analysis[1].metric, analysisSummary.analyzedData[0].analysis[1].metric);
        assert.equal(messageSent.analyzedData[0].analysis[1].indicator, analysisSummary.analyzedData[0].analysis[1].indicator);
        assert.equal(
            messageSent.analyzedData[0].analysis[1].score.buyCount,
            analysisSummary.analyzedData[0].analysis[1].score.buyCount
        );
        assert.equal(
            messageSent.analyzedData[0].analysis[1].score.sellCount,
            analysisSummary.analyzedData[0].analysis[1].score.sellCount
        );
        assert.equal(messageSent.analyzedData[0].interval.description, analysisSummary.analyzedData[0].interval.description);
        assert.equal(messageSent.analyzedData[0].summary, analysisSummary.analyzedData[0].summary);
        assert.equal(messageSent.summary, analysisSummary.summary);
        logger.info(messageSent);
    }

    @then('The handler function should exit with {boolean}')
    theHandlerFunctionShouldExitWith(expectedResult: boolean) {
        assert.equal(handlerResponse, expectedResult);
    }

    // ------------ functions ------------
    private static getJsonFile(jsonFile: String): any {
        return JSON.parse(fs.readFileSync(`${__dirname}/../resources/${jsonFile}`, 'utf-8'));
    }

    private static generateSNSMessage(message: any): SNSMessage {
        return {
            MessageAttributes: {},
            Subject: '',
            Type: 'Notification',
            MessageId: '41cf51ea-1a79-4864-9132-b15c8dd040cd',
            TopicArn: 'arn:aws:sns:sa-east-1:000000000000:cryptoAnalysisTopic',
            Message: typeof message === 'string' ? message : JSON.stringify(message),
            Timestamp: '2022-07-21T14:58:58.971',
            SignatureVersion: '1',
            Signature: 'EXAMPLEpH+..',
            SigningCertUrl: 'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-0000000000000000000000.pem',
            UnsubscribeUrl:
                'http://localhost:4566/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:sa-east-1:000000000000:cryptoAnalysisTopic:d141d0ea-1ae4-4a94-88cf-e9394155c697',
        };
    }

    private static generateSQSEvent(message: any): SQSEvent {
        return {
            Records: [
                {
                    attributes: {
                        ApproximateFirstReceiveTimestamp: '1658342181290',
                        ApproximateReceiveCount: '1',
                        SenderId: '000000000000',
                        SentTimestamp: '1658342180397',
                    },
                    awsRegion: 'sa-east-1',
                    body: typeof message === 'string' ? message : JSON.stringify(message),
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
    }
    private static generateContext(): Context {
        return {
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
    }
}
