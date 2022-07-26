import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { Indicator } from '@/domain/model/Indicator';
import { Score } from '@/domain/model/Score';

export class AnalysisSummary {
    readonly summary: Indicator;
    readonly timestamp: String;
    readonly analyzedData: AnalyzedData[];

    constructor(analyzedDataSet: AnalyzedData[]) {
        this.timestamp = new Date().toISOString();
        this.analyzedData = analyzedDataSet;
        this.summary = this.generateSummary(analyzedDataSet);
    }

    private generateSummary(analyzedDataSet: AnalyzedData[]): Indicator {
        const analysisScore = new Score();
        analyzedDataSet.forEach((analysis) => {
            analysisScore.addScore(analysis.summary);
        });

        return analysisScore.getScoreIndicator();
    }
}
