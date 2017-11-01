/**
 * @typedef {Object} Type This is generator independent.
 */

/**
 * A type for a function generator.
 */
export default class FunctionType {
    /**
     * Creates a function type prototype.
     * @param  {Type[]} args - List of types of the args
     * @param  {Type} returnType Return type of function
     */
    constructor(args, returnType) {
        /** @type {Type[]} */
        this.argTypes = args;
        
        /** @type {Type} */
        this.returnType = returnType;
    }
}
