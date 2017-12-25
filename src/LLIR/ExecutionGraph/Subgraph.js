import SubgraphType from '@/ExecutionGraph/SubgraphType';
import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
import i from '@/Serializer/SerializationInfo';

/**
 * Represents a connected (or disconnected) subgraph. Be careful when manually
 * constructing a subgraph as they have independently managed and resolved
 * domain and probabilty constraintment.
 *
 * @implements {SubgraphType}
 */
export default class Subgraph extends SubgraphType {

    /**
     * Creates a subgraph for an execution graph.
     *
     * @param {string} name - Name of subgraph. This is often analagous with the
     *                      resultant name. Must be unique.
     * @param {ExecutionGraph} graph - Execution graph that this will be added
     *                               to.
     */
    constructor(graph, name) {
        super(graph, name);
        this._body = new AtomicGraph();
    }

    /** @private */
    didSetBody() {
        this._body.setSuperSubgraph(this);
    }

    /**
     * Returns the atomic graph this holds.
     * @return {AtomicGraph}
     */
    getBody() {
        return this._body;
    }

    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     * @param {number} graphIndex - id of subgraph as uint8
     */
    serialize(serializer, graphIndex) {
        const mask = ~i.START_MASK;
        serializer.writeOne(i.SUBGRAPH);
        serializer.writeOne(graphIndex << 4 & mask | graphIndex & mask); // Move 2nd half-byte over

        this._body.serialize(serializer);

        serializer.writeOne(i.EXIT);
    }
}
