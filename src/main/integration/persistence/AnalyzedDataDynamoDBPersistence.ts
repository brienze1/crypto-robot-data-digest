import { AnalysedDataPersistenceAdapter } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalyzedData } from '@/domain/model/AnalyzedData';

class AnalyzedDataDynamoDBPersistence implements AnalysedDataPersistenceAdapter {
    update(analyzedData: AnalyzedData): AnalyzedData {
        return JSON.parse('[]');
    }

    getAllAnalyzedData(): AnalyzedData[] {
        return [];
    }
}

export default new AnalyzedDataDynamoDBPersistence();
