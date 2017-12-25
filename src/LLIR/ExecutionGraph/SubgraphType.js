/**
 * @interface
 */
export default class SubgraphType {

    /**
     * Creates a subgraph for an execution graph.
     * @param {ExecutionGraph} graph - Execution graph that this will be added
     *                               to.
     * @param {string} subgraphName - Adds a subgraph with name
     */
    constructor(graph, subgraphName) {
        this._graph = graph;
        this._name = subgraphName;
    }

    /**
     * Returns subgraph name
     * @type {string}
     */
    get name() { return this._name; }

    /**
     * Returns the parent execution graph.
     * @return {ExecutionGraph}
     */
    getExecutionGraph() {
        return this._graph;
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
