import { MovingAverage } from '@/domain/model/AnalysisData/MovingAverage';

export class AnalysisData {
    private readonly _simpleMovingAverages: MovingAverage[];
    private readonly _exponentialMovingAverages: MovingAverage[];

    constructor(simpleMovingAverages: MovingAverage[], exponentialMovingAverages: MovingAverage[]) {
        this._simpleMovingAverages = simpleMovingAverages;
        this._exponentialMovingAverages = exponentialMovingAverages;
    }

    get simpleMovingAverages(): MovingAverage[] {
        return this._simpleMovingAverages;
    }

    get exponentialMovingAverages(): MovingAverage[] {
        return this._exponentialMovingAverages;
    }
}
