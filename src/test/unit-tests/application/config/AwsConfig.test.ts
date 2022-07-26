import * as Dynamoose from 'dynamoose';
import AwsConfig from '@/application/config/AwsConfig';
import AWS from 'aws-sdk';

describe('Aws localstack config test', () => {
    it('should return dynamoose type', () => {
        const response = AwsConfig.Dynamoose;

        expect(response).not.toBe(undefined);
        expect(typeof response === typeof Dynamoose).toBe(true);
    });

    it('should return aws type', () => {
        const response = AwsConfig.AWS;

        expect(response).not.toBe(undefined);
        expect(typeof response === typeof AWS).toBe(true);
    });
});
