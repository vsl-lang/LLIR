/**
 * Represents a node which has iteratable subnodes. You **cannot** use
 * `instanceof` with this but you can use {@link NodeProfiler}'s
 * {@link NodeProfiler#supportsSuccessiveIndexing} to determine if a node
 * implements this class. If your node does implement this class. Add the
 * `static _ssi = 1` field to your class
 *
 * @interface
 */
export default class IndexableNode {
    static _ssi = 1;
    
    /**
     * Returns the atomic graph at a specific index. This index should return
     * an atomic graph which is a 'child' of the node's. This is a generator but
     * it should function in a deterministic way
     *
     * @return {AtomicGraph} This generator should output atomic graphs. Until
     *                       they don't exist anyomre.
     */
    *atomicGraphs() { return void 0 }
}
