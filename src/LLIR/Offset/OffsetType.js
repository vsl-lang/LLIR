/**
 * Represents one of the four primitive continous atomic transformation units.
 */
export default class OffsetType {
    /**
     * Creates primitive offset, use {@link Offset} instead.
     * 
     * @param {any} source - source object describing domain consideration in
     *     transformation.
     * @param {string} name - user friendly
     */
    constructor(source, name) {
        /** @private */
        this.source = source;
        
        /** @private */
        this.name = name;
    }
}