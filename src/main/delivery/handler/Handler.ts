/* eslint-disable */
import { Context, APIGatewayEvent } from 'aws-lambda';

import DataDigestUseCase from '@/domain/usecase/DataDigestUseCase';

export const execute = async (event: APIGatewayEvent, context: Context) => {
    global.correlationId = '123';
    console.log('---------------START---------------');
    console.log('EVENT OCCURRED!');
    console.log(`Message created on ${new Date()}`);
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    console.log('---------------END---------------');

    DataDigestUseCase.digest();

    return true;
};
