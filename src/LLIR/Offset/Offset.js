import OffsetType from '@/Offset/OffsetType';

/**
 * The list of Offsets. These are used for domain tracking, if you are not
 * familiar with them you may want to read the LLIR paper. These are not so
 * simple items but you can set them to configure specific information to the
 * domain tracker. The explanations for some of these might be pretty simple
 * so if you can understand them feel free to use these to label your nodes.
 *
 * @typedef {Object} Offset
 * @property {OffsetType} identity - an identity node representing input with
 *                                 the same output (never exists in compiled)
 * @property {OffsetType} prevoid - A type with a void input and defined output
 * @property {OffsetType} postvoid - A type which outputs void
 * @property {OffsetType} transform - Represents the transformation over a
 *                                  function `g`.
 */
export default {
    identity: new OffsetType(
        (f, g) => x => x,
        'x > > x', 'id'
    ),
    prevoid: new OffsetType(
        x => (f, g) => g(x),
        ', g > g', 'pre'
    ),
    postvoid: new OffsetType(
        (f, g) => x => f(x),
        'f > f', 'post'
    ),
    transform: new OffsetType(
        (f, g) => x => f(g(x)),
        'f, g > x > f + g', 't'
    )
};
