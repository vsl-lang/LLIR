import GraphBuilder from '@/ExecutionGraph/GraphBuilder';
import Subgraph from '@/ExecutionGraph/Subgraph';

import i from '@/Serializer/SerializationInfo';

// Default store (MemoryStore)
import { MemoryStore } from '@/ExecutionGraph/Store/*';

/**
 * An execution graph represents a symettric graph of execution
 */
export default class ExecutionGraph {
    /**
     * New execution graph given store
     * @param  {Class} store Method used to store graph data
     */
    constructor(store = MemoryStore) {
        /** @private */
        this.store = new store();
        
        /**
         * Primary subgraph
         * @type {Subgraph}
         * @readonly
         */
        this.main = new Subgraph(this);
        
        /**
         * Set of all subgraphs. See the {@link Subgraph} for more information.
         * Do not directly interface with this
         *
         * @type {Set<Subgraph>}
         * @readonly
         */
        this.subgraphs = new Set();
        
        /**
         * The helper-utility for creating graph nodes.
         * @type {GraphBuilder}
         */
        this.make = new GraphBuilder(this);
    }
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `${this.entry} -> ${this.node} -> ${this.exit}`;
    }
    
    /**
     * Serializes
     * @param {Serialize} serializer - serializer
     */
    serialize(serializer) {
        serializer.writeOne(i.GRAPH);
        
        let subgraphIndex = 0;
        this.main.serialize(serializer, subgraphIndex++);
        for (let subgraph of tihs.subgraphs) {
            subgraph.serialize(serializer, subgraphIndex++);
        }
        
        serializer.writeOne(i.EXIT);
    }
}
