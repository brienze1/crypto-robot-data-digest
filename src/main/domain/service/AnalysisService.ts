import { AnalysisIndicator } from '@/domain/model/AnalysisIndicator';
import { AnalyzedData } from '@/domain/model/AnalyzedData';

class AnalysisService {
    getLatestAnalyzedData(analysisIndicator: AnalysisIndicator): any {
        // TODO get previously analysed data for the same period
        // TODO evaluate if data received is newer
        // TODO analyse current data
        // TODO update database
        return undefined;
    }

    generateSummary(analyzedDataSet: AnalyzedData[], analyzedData: AnalyzedData): any {
        return undefined;
    }
}

export default new AnalysisService();
