import { Period } from '@/domain/model/Period';
import { Indicator } from '@/domain/model/Indicator';

export class MovingAverage {
    readonly period: Period;
    readonly value: number;
    readonly indicator: Indicator;

    constructor(movingAverage: MovingAverage) {
        this.period = Period[movingAverage.period as unknown as keyof typeof Period];
        this.value = movingAverage.value;
        this.indicator = Indicator[movingAverage.indicator];
    }
}
