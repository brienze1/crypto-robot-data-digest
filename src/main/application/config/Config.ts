export const CONFIG = {
    AWS: {
        URL: process.env.AWS_URL,
        PORT: Number(process.env.AWS_PORT),
        DYNAMODB: {
            DATABASE_NAME: process.env.DYNAMODB_DATABASE_NAME,
            ANALYZED_DATA: {
                TABLE_NAME: process.env.DYNAMODB_ANALYZED_DATA_TABLE_NAME,
            },
        },

        SNS: {
            ANALYSIS_SUMMARY: {
                TOPIC_ARN: `arn:aws:sns:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.SNS_ANALYSIS_SUMMARY_TOPIC_NAME}`,
            },
        },
    },
    PROFILE: process.env.PROFILE,
};
