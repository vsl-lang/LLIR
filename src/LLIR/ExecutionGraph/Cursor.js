/**
 * A debug object which should wrap a {@link Node}. This object is automatically
 * visualized as a result.
 */
export default class Cursor {
    /**
     * Creates a cursor. Generally `value` is a node but you can pass whatever
     * you like to it;
     * @param  {Object} value Any objcet to wrap
     */
    constructor(value) {
        this._value = value;
    }
    
    toString() {
        return this._value?.toString() || "_";
    }
}
