import { Interval } from '@/domain/model/Interval';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import AnalyzedDataDynamoDBPersistence from '@/integration/persistence/AnalyzedDataDynamoDBPersistence';

export interface AnalysedDataPersistenceAdapter {
    getByInterval(interval: Interval): AnalyzedData | undefined;
    getAllAnalyzedData(): AnalyzedData[];
}

export const AnalyzedDataPersistence: AnalysedDataPersistenceAdapter = AnalyzedDataDynamoDBPersistence;
