import { AnalyzedData } from '@/domain/model/AnalyzedData';
import AnalyzedDataDynamoDBPersistence from '@/integration/persistence/AnalyzedDataDynamoDBPersistence';

export interface AnalysedDataPersistenceAdapter {
    update(analyzedData: AnalyzedData): Promise<AnalyzedData>;
    getAllAnalyzedData(): Promise<AnalyzedData[]>;
}

export const AnalyzedDataPersistence: AnalysedDataPersistenceAdapter = AnalyzedDataDynamoDBPersistence;
