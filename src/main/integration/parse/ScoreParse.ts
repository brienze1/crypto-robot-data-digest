import { ScoreDto } from '@/integration/dto/ScoreDto';
import { Score } from '@/domain/model/Score';

class ScoreParse {
    toModel(scoreDto: ScoreDto): Score {
        return new Score(scoreDto.buyCount, scoreDto.sellCount);
    }
}

export default new ScoreParse();
