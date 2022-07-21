import { MovingAverage } from '@/domain/model/MovingAverage';

export class AnalysisData {
    readonly simpleMovingAverages: MovingAverage[] = [];
    readonly exponentialMovingAverages: MovingAverage[] = [];

    constructor(analysisData: AnalysisData) {
        analysisData.simpleMovingAverages.forEach((sma) => this.simpleMovingAverages.push(new MovingAverage(sma)));
        analysisData.exponentialMovingAverages.forEach((ema) => this.exponentialMovingAverages.push(new MovingAverage(ema)));
    }
}
