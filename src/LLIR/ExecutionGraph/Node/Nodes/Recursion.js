import Node from '@/ExecutionGraph/Node/Node';
import i from '@/Serializer/SerializationInfo';

/**
 * This is the recursion entry point that is ignored for typical translation
 * analysis. This represents a non-linear entry
 *
 * @extends Node
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
    
    /**
     * Returns the depth of a parent {@link AtomicGraph} in relation to a
     * {@link Node} object
     *
     * @param {Node} node - The node to locate the parent {@link AtomicGraph}
     *                    from
     * @param {AtomicGraph} graph - The graph to locate
     * @return {number} The depth of the {@link Node}. If the
     *                  {@link AtomicGraph} is not found. This is `-1`
     */
     static findDepth(node, graph) {
         let depth = 0;
         for (let parent of this.atomicParents()) {
             if (parent === graph) return depth;
             depth += 1;
         }
         return -1;
     }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.NODE);
        serializer.writeOne(i.T_RECURSION);
        serializer.writeOne(i.EXIT);
    }
}
