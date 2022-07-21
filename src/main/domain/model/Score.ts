import { Indicator } from '@/domain/model/Indicator';

export class Score {
    private buyCount: number;
    private sellCount: number;

    constructor() {
        this.buyCount = 0;
        this.sellCount = 0;
    }

    private addBuy(value: number = 1) {
        this.buyCount += value;
    }

    private addSell(value: number = 1) {
        this.sellCount += value;
    }

    getScoreIndicator(): Indicator {
        if (this.buyCount > this.sellCount) {
            return Indicator.BUY;
        }
        if (this.buyCount < this.sellCount) {
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
