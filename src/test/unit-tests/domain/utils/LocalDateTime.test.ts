import LocalDateTime from '@/domain/utils/LocalDateTime';
import { v4 } from 'uuid';

describe('LocalDateTime test', () => {
    it('should return local date time in the right format', () => {
        const localDateTimePattern = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;

        const time = LocalDateTime.now();
        const randomString = v4();

        expect(localDateTimePattern.test(time)).toBe(true);
        expect(localDateTimePattern.test(randomString)).toBe(false);
    });
});
