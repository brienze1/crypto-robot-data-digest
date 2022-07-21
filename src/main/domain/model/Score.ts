export class Score {
    readonly buyCount: number;
    readonly sellCount: number;

    constructor(buyCount: number, sellCount: number) {
        this.buyCount = buyCount;
        this.sellCount = sellCount;
    }
}
