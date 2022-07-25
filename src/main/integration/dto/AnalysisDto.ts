import { ScoreDto } from '@/integration/dto/ScoreDto';
import { Analysis } from '@/domain/model/Analysis';

export class AnalysisDto {
    readonly metric: String;
    readonly indicator: String;
    readonly score: ScoreDto;

    constructor(analysis: Analysis) {
        this.metric = analysis.metric;
        this.indicator = analysis.indicator;
        this.score = new ScoreDto(analysis.score);
    }
}
