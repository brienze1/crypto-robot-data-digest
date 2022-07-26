import { Analysis } from '@/domain/model/Analysis';
import { AnalysisDto } from '@/integration/dto/AnalysisDto';
import { Metric } from '@/domain/model/Metric';
import { Indicator } from '@/domain/model/Indicator';
import ScoreParse from '@/integration/parse/ScoreParse';

class AnalysisParse {
    toSet(analysisDtoSet: AnalysisDto[]): Analysis[] {
        const analysisSet: Analysis[] = [];

        analysisDtoSet.forEach((analysisDto) => {
            analysisSet.push(
                new Analysis(
                    Metric[analysisDto.metric as keyof typeof Metric],
                    Indicator[analysisDto.indicator as keyof typeof Indicator],
                    ScoreParse.toModel(analysisDto.score)
                )
            );
        });

        return analysisSet;
    }
}

export default new AnalysisParse();
