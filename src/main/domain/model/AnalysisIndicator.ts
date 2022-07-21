import { AnalysisData } from '@/domain/model/AnalysisData';

export class AnalysisIndicator {
    readonly interval: String;
    readonly analysisData: AnalysisData;

    constructor(analysisIndicator: AnalysisIndicator) {
        this.interval = analysisIndicator.interval;
        this.analysisData = new AnalysisData(analysisIndicator.analysisData);
    }
}
