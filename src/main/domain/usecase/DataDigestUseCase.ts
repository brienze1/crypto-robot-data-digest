import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';
import { AnalyzedDataPersistence } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { AnalysisEventService } from '@/domain/adapter/AnalysisEventAdapter';
import { AnalysisSummary } from '@/domain/model/AnalysisSummary';

class DataDigestUseCase {
    digest(analysisIndicator: AnalysisIndicator) {
        const analyzedData: AnalyzedData = new AnalyzedData(
            analysisIndicator.interval,
            analysisIndicator.timestamp,
            analysisIndicator.analysisData.generateAnalysis()
        );

        AnalyzedDataPersistence.update(analyzedData);

        const analyzedDataSet: AnalyzedData[] = AnalyzedDataPersistence.getAllAnalyzedData();

        const analysisSummary = new AnalysisSummary(analyzedDataSet);

        AnalysisEventService.sendEvent(analysisSummary);

        return analysisSummary;
    }
}

export default new DataDigestUseCase();
