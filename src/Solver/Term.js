/**
 * A term in a resolver. An atomic type with an arbitrary payload.
 */
export default class Term {
    /**
     * Create a new Term with a payload and a template specifying the type. This
     * is from a {@link Solver} object. You can also use
     * {@link TermTemplate~create} which call this constructor
     *
     * @param  {TermTemplate} template A {@link TermTemplate} which is
     *                                 registered with the {@link Solver} object
     *                                 this will be used with.
     * @param  {?any} payload  A payload. If your solver needs a payload of a
     *                         specific type, verify it before passing.
     */
    constructor(template, payload) {
        /**
         * Type of term
         * @type {TermTemplate}
         */
        this.type = template;
        
        /**
         * Payload or value
         * @type {?any}
         */
        this.value = payload;
    }
    
    /**
     * Checks if a template is of a given type name or group
     *
     * @param {string} typeName References a group or a definite type.
     * @return {boolean} `true` if matches
     */
    matchesType(typeName) {
        return this.type.name === typeName
            || this.type.groups.includes(typeName);
    }
}
