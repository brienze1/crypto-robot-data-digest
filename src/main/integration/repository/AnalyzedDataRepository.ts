import AwsConfig from '@/application/config/AwsConfig';
import { AnalyzedDataDto } from '@/integration/dto/AnalyzedDataDto';
import { Document } from 'dynamoose/dist/Document';
import { CONFIG } from '@/application/config/Config';

const { Dynamoose } = AwsConfig;

interface AnalysedDataDtoModel extends Document, AnalyzedDataDto {}

export const AnalyzedDataRepository = Dynamoose.model<AnalysedDataDtoModel>(
    `${CONFIG.DYNAMODB.DATABASE_NAME}.${CONFIG.DYNAMODB.ANALYZED_DATA.TABLE_NAME}`,
    new Dynamoose.Schema(
        {
            interval: {
                type: String,
                required: true,
                hashKey: true,
            },
        },
        {
            saveUnknown: true,
        }
    ),
    {
        create: false,
        waitForActive: false,
    }
);
