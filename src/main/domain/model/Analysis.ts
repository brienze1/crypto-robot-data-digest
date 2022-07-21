import { Action } from '@/domain/model/Action';
import { Score } from '@/domain/model/Score';
import { Indicator } from '@/domain/model/Indicator';

export class Analysis {
    readonly indicator: Indicator;
    readonly summary: Action;
    readonly score: Score;

    constructor(indicator: Indicator, summary: Action, score: Score) {
        this.indicator = indicator;
        this.summary = summary;
        this.score = score;
    }
}
