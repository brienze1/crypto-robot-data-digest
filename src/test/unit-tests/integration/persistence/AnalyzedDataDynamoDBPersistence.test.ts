import AnalyzedDataDynamoDBPersistence from '@/integration/persistence/AnalyzedDataDynamoDBPersistence';
import { AnalyzedData } from '@/domain/model/AnalyzedData';
import { Interval } from '@/domain/model/Interval';
import LocalDateTime from '@/domain/utils/LocalDateTime';
import { AnalyzedDataRepository } from '@/integration/repository/AnalyzedDataRepository';
import { AnalyzedDataDto } from '@/integration/dto/AnalyzedDataDto';
import AnalyzedDataParse from '@/integration/parse/AnalyzedDataParse';

let analyzedDataDtoSet: AnalyzedDataDto[];
let execCalledTimes: number = 0;
jest.mock('@/integration/repository/AnalyzedDataRepository', () => ({
    AnalyzedDataRepository: {
        update: jest.fn(),
        scan: jest.fn(() => ({
            exec: jest.fn(() => {
                execCalledTimes += 1;

                return analyzedDataDtoSet;
            }),
        })),
    },
}));

jest.mock('@/integration/parse/AnalyzedDataParse');
const AnalyzedDataParseMock = jest.mocked(AnalyzedDataParse, true);

describe('AnalyzedData DynamoDB persistence test', () => {
    let analyzedData: AnalyzedData;
    let analyzedDataDto: AnalyzedDataDto;
    let analyzedDataSet: AnalyzedData[];

    beforeEach(() => {
        analyzedData = new AnalyzedData(Interval.ONE_DAY, LocalDateTime.now(), []);

        analyzedDataDto = new AnalyzedDataDto(analyzedData);

        analyzedDataDtoSet = [analyzedDataDto];

        analyzedDataSet = [analyzedData];

        AnalyzedDataParseMock.toSet.mockReturnValue(analyzedDataSet);
    });

    it('should update values in the database', async () => {
        const response = await AnalyzedDataDynamoDBPersistence.update(analyzedData);

        expect(AnalyzedDataRepository.update).toHaveBeenCalledTimes(1);
        expect(AnalyzedDataRepository.update).toHaveBeenCalledWith(analyzedDataDto);
        expect(response).toEqual(analyzedData);
    });

    it('should get all values in the database', async () => {
        const response = await AnalyzedDataDynamoDBPersistence.getAllAnalyzedData();

        expect(execCalledTimes).toEqual(1);
        expect(response).toEqual(analyzedDataSet);
    });
});
