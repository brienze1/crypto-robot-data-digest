import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';
import { AnalyzedDataPersistence } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { AnalysisEventService } from '@/domain/adapter/AnalysisEventAdapter';
import { AnalysisSummary } from '@/domain/model/AnalysisSummary';

class DataDigestUseCase {
    async digest(analysisIndicator: AnalysisIndicator) {
        const analyzedData: AnalyzedData = new AnalyzedData(
            analysisIndicator.interval,
            analysisIndicator.timestamp,
            analysisIndicator.analysisData.generateAnalysis()
        );

        await AnalyzedDataPersistence.update(analyzedData);

        const analyzedDataSet: AnalyzedData[] = await AnalyzedDataPersistence.getAllAnalyzedData();

        const analysisSummary = new AnalysisSummary(analyzedDataSet);

        AnalysisEventService.sendEvent(analysisSummary);

        return analysisSummary;
    }
}

export default new DataDigestUseCase();
