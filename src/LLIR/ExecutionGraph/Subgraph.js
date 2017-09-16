import AtomicGraph from '@/ExecutionGraph/AtomicGraph';

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
}
