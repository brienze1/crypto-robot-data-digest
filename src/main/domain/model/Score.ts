import { Indicator } from '@/domain/model/Indicator';

export class Score {
    private _buyCount: number;
    private _sellCount: number;

    constructor(buyCount: number = 0, sellCount: number = 0) {
        this._buyCount = buyCount;
        this._sellCount = sellCount;
    }

    get buyCount(): number {
        return this._buyCount;
    }

    get sellCount(): number {
        return this._sellCount;
    }

    private addBuy(value: number = 1) {
        this._buyCount += value;
    }

    private addSell(value: number = 1) {
        this._sellCount += value;
    }

    getScoreIndicator(): Indicator {
        if (this._buyCount > this._sellCount) {
            return Indicator.BUY;
        }
        if (this._buyCount < this._sellCount) {
            return Indicator.SELL;
        }
        return Indicator.NEUTRAL;
    }

    addScore(indicator: Indicator) {
        switch (indicator) {
            case Indicator.STRONG_BUY:
                this.addBuy(2);
                break;
            case Indicator.BUY:
                this.addBuy();
                break;
            case Indicator.SELL:
                this.addSell();
                break;
            case Indicator.STRONG_SELL:
                this.addSell(2);
                break;
        }
    }
}
