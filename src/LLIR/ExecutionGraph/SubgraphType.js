/**
 * @interface
 */
export default class SubgraphType {
    
    /**
     * Creates a subgraph for an execution graph.
     * @param {ExecutionGraph} graph - Execution graph that this will be added
     *                               to.
     */
    constructor(graph) {
        this._graph = graph;
    }
    
    /**
     * Returns the parent execution graph.
     * @return {ExecutionGraph}
     */
    getExecutionGraph() {
        return this.graph;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     * @param {number} graphIndex - id of subgraph as uint8
     */
    serialize(serializer, graphIndex) {
        const mask = ~i.START_MASK;
        serializer.writeOne(i.SUBGRAPH_TYPE);
        serializer.writeOne(graphIndex << 4 & mask | graphIndex & mask); // Move 2nd half-byte over
        serializer.writeOne(i.EXIT);
    }
}
