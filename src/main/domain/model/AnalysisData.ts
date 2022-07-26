import { MovingAverage } from '@/domain/model/MovingAverage';
import { Analysis } from '@/domain/model/Analysis';
import { Metric } from '@/domain/model/Metric';

export class AnalysisData {
    readonly simpleMovingAverages: MovingAverage[] = [];
    readonly exponentialMovingAverages: MovingAverage[] = [];

    constructor(analysisData: AnalysisData) {
        analysisData.simpleMovingAverages.forEach((sma) => this.simpleMovingAverages.push(new MovingAverage(sma)));
        analysisData.exponentialMovingAverages.forEach((ema) => this.exponentialMovingAverages.push(new MovingAverage(ema)));
    }

    generateAnalysis(): Analysis[] {
        const analysis: Analysis[] = [];

        const simpleMovingAverageAnalysis = new Analysis(Metric.SIMPLE_MOVING_AVERAGE);
        this.simpleMovingAverages.forEach((sma) => simpleMovingAverageAnalysis.addScore(sma.indicator));

        const exponentialMovingAverageAnalysis = new Analysis(Metric.EXPONENTIAL_MOVING_AVERAGE);
        this.exponentialMovingAverages.forEach((ema) => exponentialMovingAverageAnalysis.addScore(ema.indicator));

        analysis.push(simpleMovingAverageAnalysis);
        analysis.push(exponentialMovingAverageAnalysis);

        return analysis;
    }
}
