import NodeProfiler from '@/ExecutionGraph/Node/NodeProfiler';

/**
 * An instance of a generator which indexes all of a node's 'children'.
 * @typedef {Generator<AtomicGraph>} IndexingInstance
 */

/**
 * Represents the state of a {@link GraphMap} at a single dimension.
 */
export default class MapState {
    /**
     * Creates new {@link MapState} with atomic graph setup
     * @param {Node} node - The tracking node
     * @param {?IndexingInstance} instance - If you already have a correct
     *                                     IndexingInstance you can pass this
     *                                     but that is optional.
     */
    constructor(node, instance = null) {
        this._atom = node;
        
        /**
         * Profile of the current `MapState
         * @type {NodeProfiler}
         */
        this.profiler = new NodeProfiler(this._atom);
        
        /**
         * Indexing instance (if exists) of the MapState. You can create one
         * using {@link MapState#setupIndexingInstance}
         * @type {?IndexingInstance}
         */
        this.indexingInstance = instance;
    }
    
    /**
     * Sets the new atom which must be in the same context
     * @param {Node} node - The node to move to
     */
    moveRetainingContext(node) {
        this._atom = node;
        this.profiler = new NodeProfiler(this._atom);
    }
    
    /**
     * Returns the atom
     * @type {Node}
     */
    get atom() {
        return this._atom;
    }
    
    /**
     * Creates a new {@link IndexingInstance} which is placed in the
     * {@link MapState#indexingInstance} object. Note that all nodes cannot
     * support indexing.
     *
     * @return {boolean} `true` if succesful, `false` otherwise.
     */
    setupIndexingInstance() {
        if (this.indexingInstance) return false;
        
        // We need to check if the parent (node)
        let parent = this.getAtomicParent?.(1)?.getAtom();
        
        if (!parent) return false;
        let parentProfile = new NodeProfiler(parent);
        if (!parentProfile.supportsSuccessiveIndexing) return false;
        
        this.indexingInstance = parent.atomicGraphs()
        return true;
    }
}
