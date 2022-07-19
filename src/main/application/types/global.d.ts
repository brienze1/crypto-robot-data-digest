import { v4 } from 'uuid';

declare global {
    var correlationId: String = v4();
    var transactionId: String = v4();
}


export { };
