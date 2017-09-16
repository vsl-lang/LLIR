import { Entry, Exit, Recursion } from '@/ExecutionGraph/Node/Nodes/*';

/**
 * Represents a simple $\rho\left\{F_1, F_2, \dots, F_n\right\}$ graph. This is
 * used internally and should not be directly created.
 */
export default class AtomicGraph {
    
    /**
     * Creates an AtomicGraph
     * @param  {?AtomicGraph} [supergraph=null] The super {@link AtomiGraph} of
     *                                          this graph.
     */
    constructor(supergraph) {
        /** @private */
        this.supergraph = supergraph;
        
        /**
         * Literal entry node for the atomic graph. Always opaque but may be
         * merged or redistributed after observation.
         * @type {Entry}
         */
        this.entry = new Entry();
        
        /**
         * The recursive entry point.
         * @type {Recursion}
         */
        this.recursionEntry = new Recursion();
        
        /**
         * Representative exit node. See {@link Exit} for more information, this
         * would serve as a reference but the Exit node itself is independently
         * managed and uses it's own algorithms to ensure uniqueness.
         * @type {Exit}
         */
        this.exit = new Exit();
        
        /** @private */
        this.node = null;
        
        this.notifyNewNode(this.entry);
        this.notifyNewNode(this.exit);
    }
    
    /**
     * Obtains the supergraph of this atomic graph if exists. This must be
     * managed by a (correctly implemented) supergraph for this to work.
     *
     * @return {?AtomicGraph} resulting supergraph, null if could not be found
     */
    getSupergraph() {
        return this.supergraph;
    }
    
    /**
     * Attempts to set a super-graph (e.g. for managed nodes). This will return
     * `false` is the graph is already managed (i.e. already has a parent) to
     * avoid conflicts.
     *
     * @param {AtomicGraph} supergraph - Graph to try to set as supergraph
     * @return {boolean} `true` if succesful, `false` is already managed.
     */
    setSupergraph(supergraph) {
        if (this.supergraph !== null) return false;
        this.supergraph = supergraph;
        return true;
    }
    
    /**
     * Disowns an atomic-graph, given the supergraph object which will disown
     * the current object.
     *
     * @param {Subgraph} supergraph - The subgraph which is said to own this
     *                              current atomic graph.
     * @return {boolean} `true` if the given graph is the actual supergarph, the
     *                   atomic graph will have been disowned. `false` otherwise
     */
    disown(supergraph) {
        if (supergraph !== this.supergraph) return false;
        this.supergraph = null;
        return true;
    }
    
    /**
     * Notifies that a new node has been added/
     * @param {Node} node - node
     * @private
     */
    notifyNewNode(node) {
        node.setAtomicParent(this);
    }
    
    /**
     * Sets the primary atomic node. You can use a chain node to chain
     * functions, resulting in $\text{this} = f \circ g$.
     * @param {Node} node - node to add to atomic graph execution list.
     * @return {boolean} true if succesful, false if not
     */
    setAtom(node) {
        if (this.node !== null) return false;
        this.node = node;
        this.notifyNewNode(this.node);
        return true;
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `${this.entry} -> ${this.node} -> ${this.exit}`;
    }
}
