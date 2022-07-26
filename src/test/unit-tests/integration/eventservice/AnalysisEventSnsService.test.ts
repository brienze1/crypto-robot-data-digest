import AnalysisEventSnsService from '@/integration/eventservice/AnalysisEventSnsService';
import { AnalysisSummary } from '@/domain/model/AnalysisSummary';
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import sinon from 'sinon';

describe('Analysis event sns service test', () => {
    let analysisSummary: AnalysisSummary;
    let publishSpy: any;

    beforeEach(() => {
        analysisSummary = new AnalysisSummary([]);

        AWSMock.setSDKInstance(AWS);

        publishSpy = sinon.stub().resolves(true);

        AWSMock.mock('SNS', 'publish', publishSpy);
    });

    it('should send analyzed summary data via sns event with success', async () => {
        const response = await AnalysisEventSnsService.sendEvent(analysisSummary);

        const messageSent: AnalysisSummary = JSON.parse(publishSpy.getCall(0).args[0].Message);

        expect(response).toBe(true);
        expect(publishSpy.calledOnce).toBe(true);
        expect(messageSent).toEqual(analysisSummary);
    });
});
