import Node from '@/ExecutionGraph/Node/Node';

/**
 * This is the recursion entry point that is ignored for typical translation
 * analysis. This represents a non-linear entry
 */
export default class Recursion extends Node {
    init() {
        /** @private */
        this.depth = 0;
    }
    
    /**
     * Sets the recursion entry depth. `0` refers to recurse the current
     * supergraph. A depth of `0` is always an infinite loop, in a conditional,
     * `1` would rerun the initalizer. You can use {@link Recursion.findDepth}
     * to try to find the depth between a {@link AtomicGraph} and a
     * {@link Node}.
     *
     * @param {number} depth - Recursion depth. Should be a positive integer and
     *                       the target atomic graph should exist.
     * @return {boolean} `true` if exists, `false` if the depth is too deep.
     */
    setRecursionDepth(depth) {
        if (this.getAtomicParent(depth) === null) return false;
        this.depth = depth;
        return true;
    }
}
