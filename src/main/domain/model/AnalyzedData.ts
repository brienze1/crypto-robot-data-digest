import { Interval } from '@/domain/model/Interval';
import { Analysis } from '@/domain/model/Analysis';
import { Indicator } from '@/domain/model/Indicator';
import { Score } from '@/domain/model/Score';

export class AnalyzedData {
    readonly interval: Interval;
    readonly timestamp: string;
    readonly summary: Indicator;
    readonly analysis: Analysis[] = [];

    constructor(interval: Interval, timestamp: string, analysis: Analysis[]) {
        this.interval = interval;
        this.timestamp = timestamp;
        this.analysis = analysis;
        this.summary = this.generateSummary(this.analysis);
    }

    private generateSummary(analysisSet: Analysis[]): Indicator {
        const analysisScore = new Score();
        analysisSet.forEach((analysis) => {
            analysisScore.addScore(analysis.indicator);
        });

        return analysisScore.getScoreIndicator();
    }
}
