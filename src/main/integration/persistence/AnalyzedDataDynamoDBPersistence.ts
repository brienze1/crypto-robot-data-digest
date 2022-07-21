import { AnalysedDataPersistenceAdapter } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { Interval } from '@/domain/model/Interval';

class AnalyzedDataDynamoDBPersistence implements AnalysedDataPersistenceAdapter {
    getAllAnalyzedData(): AnalyzedData[] {
        return [];
    }

    getByInterval(interval: Interval): AnalyzedData | undefined {
        return undefined;
    }
}

export default new AnalyzedDataDynamoDBPersistence();
