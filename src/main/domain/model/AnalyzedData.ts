import { Interval } from '@/domain/model/Interval';
import { Action } from '@/domain/model/Action';
import { Analysis } from '@/domain/model/Analysis';

export class AnalyzedData {
    readonly interval: Interval;
    readonly timestamp: String;
    readonly summary: Action;
    readonly analysis: Analysis[] = [];

    constructor(interval: Interval, timestamp: String, summary: Action) {
        this.interval = interval;
        this.timestamp = timestamp;
        this.summary = summary;
    }

    addAnalysis(analysis: Analysis) {
        this.analysis.push(analysis);
    }
}
