import { Period } from '@/domain/model/AnalysisData/Period';
import { Indicator } from '@/domain/model/AnalysisData/Indicator';

export class MovingAverage {
    private period: Period;
    private value: number;
    private indicator: Indicator;
}
