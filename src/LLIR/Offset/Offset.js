import OffsetType from '@/Offset/OffsetType';
export default {
    identity: new OffsetType(
        (f, g) => x => x,
        'x > > x'
    ),
    prevoid: new OffsetType(
        x => (f, g) => g(x),
        ', g > g'
    ),
    postvoid: new OffsetType(
        (f, g) => x => f(x),
        'f > f'
    ),
    transform: new OffsetType(
        (f, g) => x => f(g(x))
        'f, g > x > f + g'
    )
};