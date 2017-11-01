import SubgraphType from '@/ExecutionGraph/SubgraphType';
import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
import i from '@/Serializer/SerializationInfo';

/**
 * References an external function (i.e. needs manual constrainment).
 * @implements {SubgraphType}
 */
export default class ExternalSubgraph extends SubgraphType {
    
    /**
     * Creates a subgraph for an execution graph.
     *
     * @param {ExecutionGraph} graph - Execution graph that this will be added
     *                               to.
     * @param {string} name - Name of the subgraph, used for linkage.
     * @param {FunctionType} functionType - Function referenced. Linkage
     *                                    specifics depends on backend.
     */
    constructor(graph, name, functionType) {
        super(graph);
        
        /** @type {string} */
        this.name = name;
        
        /** @type {FunctionType} */
        this.type = type;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     * @param {number} graphIndex - id of subgraph as uint8
     */
    serialize(serializer, graphIndex) {
        const mask = ~i.START_MASK;
        // serializer.writeOne(i.EXTERNAL_SUBGRAPH);
        // serializer.writeOne(graphIndex << 4 & mask | graphIndex & mask); // Move 2nd half-byte over
        //
        // this.body.serialize(serializer);
         
        serializer.writeOne(i.EXIT);
    }
}
