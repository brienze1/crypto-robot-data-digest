import AnalyzedDataParse from '@/integration/parse/AnalyzedDataParse';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { AnalyzedDataDto } from '@/integration/dto/AnalyzedDataDto';
import { Analysis } from '@/domain/model/Analysis';
import { Score } from '@/domain/model/Score';
import { Metric } from '@/domain/model/Metric';
import { Indicator } from '@/domain/model/Indicator';
import AnalysisParse from '@/integration/parse/AnalysisParse';
import { Interval } from '@/domain/model/Interval';
import LocalDateTime from '@/domain/utils/LocalDateTime';

jest.mock('@/integration/parse/AnalysisParse');
const AnalysisParseMock = jest.mocked(AnalysisParse, true);

describe('AnalyzedData parse test', () => {
    let analyzedDataSet: AnalyzedData[];
    let analyzedDataDtoSet: AnalyzedDataDto[];

    beforeEach(() => {
        const analysis = new Analysis(Metric.SIMPLE_MOVING_AVERAGE, Indicator.STRONG_SELL, new Score(3, 5));

        const analysisSet = [analysis];

        AnalysisParseMock.toSet.mockReturnValue(analysisSet);

        const analyzedData = new AnalyzedData(Interval.ONE_DAY, LocalDateTime.now(), analysisSet);

        analyzedDataSet = [analyzedData];

        analyzedDataDtoSet = [new AnalyzedDataDto(analyzedData)];
    });

    it('should parse AnalyzedDataDto[] to AnalyzedData[]', () => {
        const response = AnalyzedDataParse.toSet(analyzedDataDtoSet);

        expect(response).toEqual(analyzedDataSet);
    });
});
