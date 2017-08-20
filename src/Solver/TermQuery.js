/**
 * Represents a matcher for a set of {@link Term} objects.
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
    
    /**
     * Returns a template constructor to create a {@link TermQuery} from the
     * visual format.
     *
     * @param {Solver} solver - The solver object which the TermTemplates are
     *                        registered with
     * @return {Object} A template function to use.
     */
    static fromVisual(solver) {
        return (string) => {
            let types = string.split(" ");
            return new TermQuery(types);
        };
    }
}
