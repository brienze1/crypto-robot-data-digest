export class Interval {
    public static readonly ONE_MINUTE = new Interval('1m', 'ONE_MINUTE', 4);
    public static readonly FIVE_MINUTES = new Interval('5m', 'FIVE_MINUTES', 3);
    public static readonly FIFTEEN_MINUTES = new Interval('15m', 'FIFTEEN_MINUTES', 3);
    public static readonly THIRTY_MINUTES = new Interval('30m', 'THIRTY_MINUTES', 3);
    public static readonly ONE_HOUR = new Interval('1h', 'ONE_HOUR', 2);
    public static readonly SIX_HOURS = new Interval('6h', 'SIX_HOURS', 1);
    public static readonly ONE_DAY = new Interval('1d', 'ONE_DAY', 1);

    private constructor(readonly value: String, readonly description: String, readonly weight: Number) {}
}
