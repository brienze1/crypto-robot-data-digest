import AwsConfig from '@/application/config/AwsConfig';
import * as Dynamoose from 'dynamoose';
import { CONFIG } from '@/application/config/Config';

jest.mock('dynamoose');
const DynamooseMock = jest.mocked(Dynamoose, true);

jest.doMock('@/application/config/Config', () => ({
    __esModule: true,
    CONFIG: {
        DYNAMODB: {
            URL: process.env.DYNAMODB_URL,
        },
        PROFILE: process.env.PROFILE,
    },
}));

describe('Aws localstack config test', () => {
    it('should test aws config localstack profile', () => {
        CONFIG.PROFILE = 'localstack';
        CONFIG.DYNAMODB.URL = 'url-localstack';

        const response = AwsConfig.getDynamoose();

        expect(response).not.toBe(undefined);
        expect(DynamooseMock.aws.ddb.local).toHaveBeenCalledWith('url-localstack');
    });

    it('should test aws config development profile', () => {
        CONFIG.PROFILE = 'development';
        CONFIG.DYNAMODB.URL = 'url-development';

        const response = AwsConfig.getDynamoose();

        expect(response).not.toBe(undefined);
        expect(DynamooseMock.aws.ddb.local).toHaveBeenCalledWith('url-development');
    });

    it('should test aws config with unknown profile', () => {
        CONFIG.PROFILE = 'unknown';

        const response = AwsConfig.getDynamoose();

        expect(response).not.toBe(undefined);
        expect(DynamooseMock.aws.ddb.local).toHaveBeenCalledTimes(0);
    });
});
