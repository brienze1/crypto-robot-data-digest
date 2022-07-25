export const CONFIG = {
    DYNAMODB: {
        URL: process.env.DYNAMODB_URL,
        PORT: Number(process.env.DYNAMODB_PORT),
        DATABASE_NAME: process.env.DYNAMODB_DATABASE_NAME,
        ANALYZED_DATA: {
            TABLE_NAME: process.env.DYNAMODB_ANALYZED_DATA_TABLE_NAME,
        },
    },
    PROFILE: process.env.PROFILE,
    SNS: {
        ANALYSIS_SUMMARY: {
            TOPIC_ARN: `arn:aws:sns:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.SNS_ANALYSIS_SUMMARY_TOPIC_NAME}`,
        },
    },
};
