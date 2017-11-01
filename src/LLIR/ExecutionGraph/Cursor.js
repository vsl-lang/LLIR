/**
 * A debug object which should wrap a {@link Node}. This object is automatically
 * visualized as a result.
 */
export default class Cursor {
    /**
     * Creates a cursor to a graph node.
     * @param {Node} node Node to wrap
     * @protected
     */
    constructor(value) {
        this._value = value;
    }
    
    /**
     * Returns the wrapped node
     * @return {Node} unwrapped node
     */
    getNode() {
        return this._value;
    }
    
    /**
     * Gets the containing subgraph
     * @type {?Subgraph}
     */
    getSubgraph() {
        return this._value.getImmediateAtomicParent()?.getSuperSubgraph();
    }
    
    /**
     * Gets the containing execution graph.
     * @return {?ExecutionGraph}
     */
    getExecutionGraph() {
        return this.getSubgraph()?.getExecutionGraph();
    }
    
    toString() {
        return this._value?.toString() || "_";
    }
}
