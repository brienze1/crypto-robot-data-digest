import express from 'express';
import { Test } from '@/delivery/dto/test';

const app = express();

app.get('/', (req: any, res: any) => {
    const test = new Test();
    test.test = 'Hello World';

    res.json({ message: test.test });
});

app.listen(8085);
