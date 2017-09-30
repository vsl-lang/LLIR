import { Entry, Exit, Recursion, NoOp } from '@/ExecutionGraph/Node/Nodes/*';
import i from '@/Serializer/SerializationInfo';

/**
 * Represents a simple \\[\rho\left\\{F_1, F_2, \ldots, F_n\right\\}\\] graph. This is
 * used internally and should not be directly created.
 */
export default class AtomicGraph {
    
    /**
     * Creates an AtomicGraph
     * @param  {?AtomicGraph} [supergraph=null] The super {@link AtomiGraph} of
     *                                          this graph.
     */
    constructor(supergraph = null) {
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
        this.node = new NoOp();
        this.node.setPlaceholder(true);
        
        this.notifyNewNode(this.node);
        this.notifyNewNode(this.entry);
        this.notifyNewNode(this.exit);
        this.notifyNewNode(this.recursionEntry);
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
     * @return {boolean} if successful
     * @private
     */
    notifyNewNode(node) {
        return node.setAtomicParent(this);
    }
    
    /**
     * Sets the primary atomic node. You can use a chain node to chain
     * functions, resulting in $\text{this} = f \circ g$.
     * @param {Node} node - node to add to atomic graph execution list.
     * @return {boolean} true if succesful, false if not
     */
    setAtom(node) {
        if (this.node !== null && !(
                this.node instanceof NoOp && this.node.placeholder
            )
        ) return false;
        this.node = node;
        return this.notifyNewNode(this.node);
    }
    
    /**
     * Returns the primary node of the atomic graph.
     * @return {?Node} the subgraph's node. `null` if does not exist. If that is
     *                 the whole atomic graph is void
     */
    getAtom() {
        return this.node;
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `\u001B[32mp\u001B[0m${this.node}`;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        let atom = this.node;
         
        if (atom !== null) {
            serializer.writeOne(i.ATOMIC_GRAPH);
            
            this.entry.serialize(serializer);
            atom.serialize(serializer);
            this.exit.serialize(serializer);
            this.recursionEntry.serialize(serializer);
            
            serializer.writeOne(i.EXIT);
        }
    }
}
