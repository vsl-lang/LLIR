import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

let NOOP_COUNTER = 0;

/**
 * An empty node
 *
 * @extends Node
 */
export default class NoOp extends Node {
    /** @override */
    init() {
        this._id = NOOP_COUNTER++;
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `\u001B[0;31m*${this._id}\u001B[0m`;
    }
    
    /**
     * A placeholder i.e. default NoOp. (You should never change this).
     * @type {boolean}
     * @readonly
     */
    placeholder = false
    _hasSetPlaceholder = false
    
    /**
     * Sets as a placeholder
     * @param {boolean} value - `true` if should become placeholder. `false`
     *                        otherwise.
     * @return {boolean} `true` if was set, `false` if could not (i.e.
     *                   unchangable at that point in time)
     */
    setPlaceholder(value) {
        if (this._hasSetPlaceholder === true) return false;
        this.placeholder = value;
        this._hasSetPlaceholder = true
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.NODE);
        serializer.writeOne(i.T_NOOP);
        serializer.writeOne(i.EXIT);
    }
}
