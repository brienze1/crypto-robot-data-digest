import { AnalysedDataPersistenceAdapter } from '@/domain/adapter/AnalysedDataPersistenceAdapter';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { AnalyzedDataDto } from '@/integration/dto/AnalyzedDataDto';
import { AnalyzedDataRepository } from '@/integration/repository/AnalyzedDataRepository';
import AnalyzedDataParse from '@/integration/parse/AnalyzedDataParse';

class AnalyzedDataDynamoDBPersistence implements AnalysedDataPersistenceAdapter {
    async update(analyzedData: AnalyzedData): Promise<AnalyzedData> {
        const analyzedDataDto = new AnalyzedDataDto(analyzedData);

        await AnalyzedDataRepository.update(analyzedDataDto);

        return analyzedData;
    }

    async getAllAnalyzedData(): Promise<AnalyzedData[]> {
        const analyzedDataSetDto: AnalyzedDataDto[] = await AnalyzedDataRepository.scan().exec();

        return AnalyzedDataParse.toSet(analyzedDataSetDto);
    }
}

export default new AnalyzedDataDynamoDBPersistence();
