import * as Dynamoose from 'dynamoose';
import { CONFIG } from '@/application/config/Config';
import AWS from 'aws-sdk';

class AwsConfig {
    private static instance: AwsConfig;
    readonly Dynamoose: typeof Dynamoose;
    readonly AWS: typeof AWS;

    private constructor() {
        this.Dynamoose = AwsConfig.getDynamoose();
        this.AWS = AwsConfig.getAWS();
    }

    static getInstance(): AwsConfig {
        if (!AwsConfig.instance) {
            AwsConfig.instance = new AwsConfig();
        }
        return AwsConfig.instance;
    }

    private static getDynamoose(): typeof Dynamoose {
        if (CONFIG.PROFILE === 'localstack' || CONFIG.PROFILE === 'development' || CONFIG.PROFILE === 'test') {
            Dynamoose.aws.ddb.local(`${CONFIG.AWS.URL}:${CONFIG.AWS.PORT}`);
        }

        return Dynamoose;
    }

    private static getAWS(): typeof AWS {
        if (CONFIG.PROFILE === 'localstack' || CONFIG.PROFILE === 'development' || CONFIG.PROFILE === 'test') {
            AWS.config.update({
                sns: {
                    endpoint: `${CONFIG.AWS.URL}:${CONFIG.AWS.PORT}`,
                },
            });
        }

        return AWS;
    }
}

export default AwsConfig.getInstance();
