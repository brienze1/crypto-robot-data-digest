import ScoreParse from '@/integration/parse/ScoreParse';
import { ScoreDto } from '@/integration/dto/ScoreDto';
import { Score } from '@/domain/model/Score';

describe('Score parse test', () => {
    let score: Score;
    let scoreDto: ScoreDto;

    beforeEach(() => {
        score = new Score(10, 3);

        scoreDto = new ScoreDto(score);
    });

    it('should parse ScoreDto to Score', () => {
        const response = ScoreParse.toModel(scoreDto);

        expect(response).toEqual(score);
    });
});
