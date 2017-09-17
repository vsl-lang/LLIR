/**
 * A primitive graph node representing some form of behavior. All nodes interact
 * and connect to their parent `AtomicGraph`s. Not all nodes have a
 * {@link PayloadInteractor} however some do and you can try to interface with
 * those.
 *
 * @abstract
 */
export default class Node {
    constructor(payload) {
        /** @private */
        this.payload = payload;
        
        /** @private */
        this.atomicParent = null;
        
        this.init();
    }
    
    /**
     * Abstract entry point for adding late-initalization of a node.
     * @abstract
     */
    init() {}
    
    /**
     * Abstract listener for when the atomic parent was set. The parent may be
     * null when this is called.
     * @abstract}
     */
    didSetAtomicParent() {}
    
    /**
     * Sets the atomic parent for the current node.
     *
     * @param {AtomicGraph} parent - The _immediate_ atomic parent of this
     *                             node. This will be associated with this and
     *                             can only be associated with one immediate
     *                             atomic node.
     * @return {boolean} `true` if the atomic parent was set, `false` if not.
     *                   a `false` return would be caused by the node already
     *                   being owned by another graph.
     */
    setAtomicParent(parent) {
        if (this.atomicParent !== null) return false;
        this.atomicParent = parent;
        this.didSetAtomicParent()
        return true;
    }
    
    /**
     * Returns a generator returning the atomic parents (bottom-up) of the node.
     * @return {GeneratorFunction}
     */
    *atomicParents() {
        let parent = this.getImmediateAtomicParent();
        
        do yield parent;
        while ((parent = parent.getSupergraph()));
    }
    
    /**
     * Disowns a node from a parent {@link AtomicGraph}. This will remove the
     * ownership if the passed parent matches the stored one.
     *
     * @param  {AtomicGraph} parent - graph which claims to have ownership over
     *                              the node
     * @return {boolean} `true` if disowned, `false` if not, meaning the graph
     *                   is not the owner.
     */
    disown(parent) {
        if (parent !== this.atomicParent) return false;
        this.atomicParent = null;
        this.didSetAtomicParent();
        return true;
    }
    
    /**
     * Locates the immedicate atomic parent transparent node.
     * @return {?AtomicGraph} matched atomic subgraph, null if doesn't exist or
     *                        could not be found.
     */
     getImmediateAtomicParent() {
         return this.atomicParent;
     }
     
     /**
      * Locates the atomic parent at a depth. `0` would be the immediate atomic
      * node, and successive depths rise up the graph.
      *
      * @param {number} depth - The depth, must be a positive integer.
      * @return {?AtomicGraph} the graph if it exists, otherwise `null`
      */
     getAtomicParent(depth) {
         let parent = this.atomicParent;
         while (depth --> 0 && parent && (parent = parent.getSupergraph()));
         return parent;
     }
    
    /**
     * Locates the entry node of the immediate atomic parent.
     * @return {?Entry} entry node, null if could not be found.
     */
    closestEntry() {
        let atomicParent = this.atomicParent;
        if (atomicParent == null) return null;
        else return atomicParent.entry;
    }
    
    /**
     * Locates the exit node of the immediate atomic parent.
     * @return {?Exit} entry node, null if could not be found.
     */
    closestExit() {
        let atomicParent = this.atomicParent;
        if (atomicParent == null) return null;
        else return atomicParent.exit;
    }
    
    /**
     * Returns payload if the node is opaque at inspection-time. The payload's
     * ownership may not be the same node use `getPayloadOwner()` to get the
     * source(s) of the payload.
     *
     * @return {any} payload value
     */
    getPayload() {
        return this.payload;
    }
    
    /**
     * Returns the owner node of the payload returned from
     * {@link Node#getPayload}.
     *
     * @type {Node} node reference
     */
    getPayloadOwner() {
        return this;
    }
}
