import GraphBuilder from '@/ExecutionGraph/GraphBuilder';
import Subgraph from '@/ExecutionGraph/Subgraph';

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
        
        /** @private */
        this.main = new Subgraph(this);
    }
    
    /**
     * The helper-utility for creating graph nodes.
     * @type {GraphBuilder}
     */
    make = new GraphBuilder(this);
    
    /**
     * Converts to string representation
     * @return {string} debuggable string
     */
    toString() {
        return `${this.entry} -> ${this.node} -> ${this.exit}`;
    }
}
