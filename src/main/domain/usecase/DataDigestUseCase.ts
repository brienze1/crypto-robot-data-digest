import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';
import AnalysisService from '@/domain/service/AnalysisService';
import { AnalyzedDataPersistence } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { AnalysisEventService } from '@/domain/adapter/AnalysisEventAdapter';

class DataDigestUseCase {
    digest(analysisIndicator: AnalysisIndicator) {
        // TODO get latest analyzed data
        const analyzedData: AnalyzedData = AnalysisService.getLatestAnalyzedData(analysisIndicator);

        // TODO get all evaluated data
        const analyzedDataSet: AnalyzedData[] = AnalyzedDataPersistence.getAllAnalyzedData();

        // TODO generate summary
        const analysisSummary = AnalysisService.generateSummary(analyzedDataSet, analyzedData);

        // TODO send event (BUY, SELL)
        AnalysisEventService.sendEvent(analysisSummary);

        return analysisSummary;
    }
}

export default new DataDigestUseCase();
