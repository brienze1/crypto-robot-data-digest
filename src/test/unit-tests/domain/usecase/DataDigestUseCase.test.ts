import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';
import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { AnalyzedDataPersistence } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalysisEventService } from '@/domain/adapter/AnalysisEventAdapter';
import { Interval } from '@/domain/model/Interval';
import { Period } from '@/domain/model/Period';
import { Indicator } from '@/domain/model/Indicator';
import { AnalysisSummary } from '@/domain/model/AnalysisSummary';

jest.mock('@/domain/adapter/AnalysedDataPersistenceAdapter');
const AnalyzedDataPersistenceMock = jest.mocked(AnalyzedDataPersistence, true);

jest.mock('@/domain/adapter/AnalysisEventAdapter');
const AnalysisEventServiceMock = jest.mocked(AnalysisEventService, true);

describe('Data Digest Use Case Tests', () => {
    let analysisIndicator: AnalysisIndicator;
    let analyzedDataSet: AnalyzedData[];
    let analysisSummary: AnalysisSummary;

    beforeEach(() => {
        analysisIndicator = new AnalysisIndicator(
            JSON.parse(
                JSON.stringify({
                    interval: Interval.ONE_DAY,
                    timestamp: new Date().toISOString(),
                    analysisData: {
                        simpleMovingAverages: [
                            {
                                period: Period.FIVE,
                                value: 22479.072,
                                indicator: Indicator.NEUTRAL,
                            },
                            {
                                period: Period.TEN,
                                value: 21457.346,
                                indicator: Indicator.BUY,
                            },
                            {
                                period: Period.TWENTY,
                                value: 20987.8395,
                                indicator: Indicator.BUY,
                            },
                            {
                                period: Period.FIFTY,
                                value: 22815.0182,
                                indicator: Indicator.NEUTRAL,
                            },
                            {
                                period: Period.HUNDRED,
                                value: 28716.1748,
                                indicator: Indicator.NEUTRAL,
                            },
                            {
                                period: Period.TWO_HUNDRED,
                                value: 35075.6691,
                                indicator: Indicator.NEUTRAL,
                            },
                        ],
                        exponentialMovingAverages: [
                            {
                                period: Period.FIVE,
                                value: 22094.03041,
                                indicator: Indicator.NEUTRAL,
                            },
                            {
                                period: Period.TEN,
                                value: 21009.22521,
                                indicator: Indicator.BUY,
                            },
                            {
                                period: Period.TWENTY,
                                value: 20475.42766,
                                indicator: Indicator.SELL,
                            },
                            {
                                period: Period.FIFTY,
                                value: 24912.26174,
                                indicator: Indicator.STRONG_SELL,
                            },
                            {
                                period: Period.HUNDRED,
                                value: 32123.80436,
                                indicator: Indicator.STRONG_BUY,
                            },
                            {
                                period: Period.TWO_HUNDRED,
                                value: 38738.82237,
                                indicator: Indicator.NEUTRAL,
                            },
                        ],
                    },
                })
            )
        );

        analyzedDataSet = [];

        Object.values(Interval).forEach((interval) => {
            const data = new AnalyzedData(interval, new Date().toISOString(), analysisIndicator.analysisData.generateAnalysis());
            analyzedDataSet.push(data);
        });

        AnalyzedDataPersistenceMock.getAllAnalyzedData.mockResolvedValue(analyzedDataSet);

        analysisSummary = new AnalysisSummary(analyzedDataSet);
    });

    it('should perform all use-case tasks correctly', async () => {
        const resp = await DataDigestUseCase.digest(analysisIndicator);

        expect(AnalyzedDataPersistenceMock.update).toHaveBeenCalledTimes(1);
        expect(AnalyzedDataPersistenceMock.getAllAnalyzedData).toHaveBeenCalledTimes(1);
        expect(AnalyzedDataPersistenceMock.getAllAnalyzedData).toHaveBeenCalledWith();
        expect(AnalysisEventServiceMock.sendEvent).toHaveBeenCalledTimes(1);
        expect(resp.summary).toEqual(analysisSummary.summary);
        expect(resp.analyzedData).toEqual(analysisSummary.analyzedData);
    });
});
