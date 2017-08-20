/**
 * Matches
 */
export default class TermQuery {
    /**
     * Creates a TermQuey matching a series of TermTypes
     *
     * @param  {TermType[]} types A list of {@link TermType} objects from a
     *                            {@link Solver} object.
     */
    constructor(types) {
        /** @private */
        this.types = types;
    }
}
