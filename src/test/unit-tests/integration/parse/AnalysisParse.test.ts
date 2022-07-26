import AnalysisParse from '@/integration/parse/AnalysisParse';
import { Analysis } from '@/domain/model/Analysis';
import { AnalysisDto } from '@/integration/dto/AnalysisDto';
import { Metric } from '@/domain/model/Metric';
import { Indicator } from '@/domain/model/Indicator';
import { Score } from '@/domain/model/Score';
import ScoreParse from '@/integration/parse/ScoreParse';

jest.mock('@/integration/parse/ScoreParse');
const ScoreParseMock = jest.mocked(ScoreParse, true);

describe('Analysis parse test', () => {
    let analysisSet: Analysis[];
    let analysisDtoSet: AnalysisDto[];

    beforeEach(() => {
        const score = new Score(3, 5);

        ScoreParseMock.toModel.mockReturnValue(score);

        const analysis = new Analysis(Metric.SIMPLE_MOVING_AVERAGE, Indicator.STRONG_SELL, score);

        analysisSet = [analysis];

        analysisDtoSet = [new AnalysisDto(analysis)];
    });

    it('should parse AnalysisDto[] to Analysis[] with success', () => {
        const response = AnalysisParse.toSet(analysisDtoSet);

        expect(response).toEqual(analysisSet);
    });
});
