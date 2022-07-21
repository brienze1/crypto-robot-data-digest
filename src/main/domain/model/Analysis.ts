import { Score } from '@/domain/model/Score';
import { Indicator } from '@/domain/model/Indicator';
import { Metric } from '@/domain/model/Metric';

export class Analysis {
    readonly metric: Metric;
    readonly score: Score;
    private _indicator: Indicator;

    constructor(metric: Metric) {
        this._indicator = Indicator.NEUTRAL;
        this.metric = metric;
        this.score = new Score();
    }

    addScore(indicator: Indicator) {
        this.score.addScore(indicator);

        this._indicator = this.score.getScoreIndicator();
    }

    get indicator(): Indicator {
        return this._indicator;
    }
}
