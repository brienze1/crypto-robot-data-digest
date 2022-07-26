import { Score } from '@/domain/model/Score';

export class ScoreDto {
    readonly buyCount: number;
    readonly sellCount: number;

    constructor(score: Score) {
        this.buyCount = score.buyCount;
        this.sellCount = score.sellCount;
    }
}
