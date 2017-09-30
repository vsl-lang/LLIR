import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
import i from '@/Serializer/SerializationInfo';

/**
 * Represents a connected (or disconnected) subgraph. Be careful when manually
 * constructing a subgraph as they have independently managed and resolved
 * domain and probabilty constraintment.
 */
export default class Subgraph {
    
    /**
     * Creates a subgraph for an execution graph.
     */
    constructor(graph) {
        /** @private */
        this.graph = graph;
        
        /**
         * Root atomic graph of the subgraph
         * @type {AtomicGraph}
         */
        this.body = new AtomicGraph();
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
         
        this.body.serialize(serializer);
         
        serializer.writeOne(i.EXIT);
    }
}
