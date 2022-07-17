import { Test } from '@/delivery/dto/test';

it('should test', () => {
    const test = new Test();

    test.test = 'test';

    expect(test.test).toEqual('test');
});

const test = new Test();
test.test = 'test';
