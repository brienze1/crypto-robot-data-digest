import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';
import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import AnalysisService from '@/domain/service/AnalysisService';
import { AnalyzedDataPersistence } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalysisEventService } from '@/domain/adapter/AnalysisEventAdapter';
import { v4 } from 'uuid';

jest.mock('@/domain/service/AnalysisService');
const AnalysisServiceMock = jest.mocked(AnalysisService, true);

jest.mock('@/domain/adapter/AnalysedDataPersistenceAdapter');
const AnalyzedDataPersistenceMock = jest.mocked(AnalyzedDataPersistence, true);

jest.mock('@/domain/adapter/AnalysisEventAdapter');
const AnalysisEventServiceMock = jest.mocked(AnalysisEventService, true);

describe('Data Digest Use Case Tests', () => {
    let analysisIndicator: AnalysisIndicator;
    let analyzedData: AnalyzedData;
    let analyzedDataSet: AnalyzedData[];
    let analysisSummary: String;

    beforeEach(() => {
        analysisIndicator = JSON.parse('{}');
        analyzedData = JSON.parse('{}');
        analyzedDataSet = [];
        analysisSummary = v4();

        AnalysisServiceMock.getLatestAnalyzedData.mockReturnValue(analyzedData);

        AnalyzedDataPersistenceMock.getAllAnalyzedData.mockReturnValue(analyzedDataSet);

        AnalysisServiceMock.generateSummary.mockReturnValue(analysisSummary);
    });

    it('should perform all use-case tasks correctly', () => {
        const resp = DataDigestUseCase.digest(analysisIndicator);

        expect(AnalysisServiceMock.getLatestAnalyzedData).toHaveBeenCalledTimes(1);
        expect(AnalysisServiceMock.getLatestAnalyzedData).toHaveBeenCalledWith(analysisIndicator);
        expect(AnalysisServiceMock.getLatestAnalyzedData).toHaveReturnedWith(analyzedData);
        expect(AnalyzedDataPersistenceMock.getAllAnalyzedData).toHaveBeenCalledTimes(1);
        expect(AnalyzedDataPersistenceMock.getAllAnalyzedData).toHaveBeenCalledWith();
        expect(AnalyzedDataPersistenceMock.getAllAnalyzedData).toHaveReturnedWith(analyzedDataSet);
        expect(AnalysisServiceMock.generateSummary).toHaveBeenCalledTimes(1);
        expect(AnalysisServiceMock.generateSummary).toHaveBeenCalledWith(analyzedDataSet, analyzedData);
        expect(AnalysisServiceMock.generateSummary).toHaveReturnedWith(analysisSummary);
        expect(AnalysisEventServiceMock.sendEvent).toHaveBeenCalledTimes(1);
        expect(AnalysisEventServiceMock.sendEvent).toHaveBeenCalledWith(analysisSummary);
        expect(resp).toEqual(resp);
    });
});
