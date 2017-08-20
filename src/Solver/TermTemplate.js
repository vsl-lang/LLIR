import Term from './Term';

/**
 * This specifies a type for the term types a {@link Solver} can take. You can
 * then query these using a {@link TermQuery}
 */
export default class TermTemplate {
    /**
     * Creates a new TermTemplate but make sure you pass this to a
     * {@link Solver} class.
     *
     * @param  {string}   name   The name of what this template type is called.
     * @param  {string[]} [groups=[]] A list of generic names which can be
     *                                associated with multiple templates to
     *                                refer to multiple types.
     */
    constructor(name, groups = []) {
        /**
         * The name of what this template type is called.
         * @type {string}
         */
        this.name = name;
        
        /**
         * A list of generic names which can be associated with multiple
         * templates to refer to multiple types.
         * @type {string[]}
         */
        this.groups = groups;
    }
    
    /**
     * Creates a new {@link Term} of the current type with a payload. This is a
     * helper function which is no different than the {@link Term} constructor.
     *
     * @param {?any} payload - A payload. If your solver needs a payload of a
     *                         specific type, verify it before passing.
     * @return {Term} newly prepared Term object
     */
    create(payload) {
        return new Term(this, payload);
    }
}
