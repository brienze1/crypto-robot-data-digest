import { Score } from '@/domain/model/Score';
import { Indicator } from '@/domain/model/Indicator';
import { Metric } from '@/domain/model/Metric';

export class Analysis {
    readonly metric: Metric;
    private _indicator: Indicator;
    readonly score: Score;

    constructor(metric: Metric, indicator: Indicator = Indicator.NEUTRAL, score: Score = new Score(),) {
        this.metric = metric;
        this._indicator = indicator;
        this.score = score;
    }

    addScore(indicator: Indicator) {
        this.score.addScore(indicator);

        this._indicator = this.score.getScoreIndicator();
    }

    get indicator(): Indicator {
        return this._indicator;
    }
}
