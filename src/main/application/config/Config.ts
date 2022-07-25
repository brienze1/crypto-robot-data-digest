export const CONFIG = {
    DYNAMODB: {
        URL: process.env.DYNAMODB_URL,
        DATABASE_NAME: process.env.DYNAMODB_DATABASE_NAME,
        ANALYZED_DATA: {
            TABLE_NAME: process.env.DYNAMODB_ANALYZED_DATA_TABLE_NAME,
        },
    },
    PROFILE: process.env.PROFILE
};
