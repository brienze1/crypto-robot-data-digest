import { AnalysisData } from '@/domain/model/AnalysisData';
import { Interval } from '@/domain/model/Interval';

export class AnalysisIndicator {
    readonly interval: Interval;
    readonly timestamp: string;
    readonly analysisData: AnalysisData;

    constructor(analysisIndicator: AnalysisIndicator) {
        this.interval = Interval[analysisIndicator.interval as unknown as keyof typeof Interval];
        this.timestamp = analysisIndicator.timestamp;
        this.analysisData = new AnalysisData(analysisIndicator.analysisData);
    }
}
