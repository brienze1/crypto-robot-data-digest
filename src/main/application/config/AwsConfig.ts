import * as Dynamoose from 'dynamoose';
import { CONFIG } from '@/application/config/Config';

class AwsConfig {
    getDynamoose(): typeof Dynamoose {
        if (CONFIG.PROFILE === 'localstack') {
            Dynamoose.aws.ddb.local(CONFIG.DYNAMODB.URL);
        }
        if (CONFIG.PROFILE === 'development') {
            Dynamoose.aws.ddb.local(CONFIG.DYNAMODB.URL);
        }

        return Dynamoose;
    }
}

export default new AwsConfig();
