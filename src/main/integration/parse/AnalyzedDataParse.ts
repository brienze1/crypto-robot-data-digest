import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { AnalyzedDataDto } from '@/integration/dto/AnalyzedDataDto';
import { Interval } from '@/domain/model/Interval';
import AnalysisParse from '@/integration/parse/AnalysisParse';

class AnalyzedDataParse {
    toSet(analyzedDataDtoSet: AnalyzedDataDto[]): AnalyzedData[] {
        const analyzedDataSet: AnalyzedData[] = [];

        analyzedDataDtoSet.forEach((analyzedDataDto) =>
            analyzedDataSet.push(
                new AnalyzedData(
                    Interval[analyzedDataDto.interval as keyof typeof Interval],
                    analyzedDataDto.timestamp,
                    AnalysisParse.toSet(analyzedDataDto.analysis)
                )
            )
        );

        return analyzedDataSet;
    }
}

export default new AnalyzedDataParse();
