import { AnalyzedData } from '@/domain/model/AnalyzedData';
import AnalyzedDataDynamoDBPersistence from '@/integration/persistence/AnalyzedDataDynamoDBPersistence';

export interface AnalysedDataPersistenceAdapter {
    update(analyzedData: AnalyzedData): AnalyzedData;
    getAllAnalyzedData(): AnalyzedData[];
}

export const AnalyzedDataPersistence: AnalysedDataPersistenceAdapter = AnalyzedDataDynamoDBPersistence;
