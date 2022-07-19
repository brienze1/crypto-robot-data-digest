export class Interval {
    public static readonly ONE_MINUTE = new Interval('1m', 'One minute', 4);
    public static readonly FIVE_MINUTES = new Interval('5m', 'Five minutes', 3);
    public static readonly FIFTEEN_MINUTES = new Interval('15m', 'Fifteen minutes', 3);
    public static readonly THIRTY_MINUTES = new Interval('30m', 'Thirty minutes', 3);
    public static readonly ONE_HOUR = new Interval('1h', 'One hour', 2);
    public static readonly SIX_HOURS = new Interval('6h', 'Six hours', 1);
    public static readonly ONE_DAY = new Interval('1d', 'One day', 1);

    private constructor(
        private value: string,
        private description: string,
        private weight: number,
    ) {
    }

}
