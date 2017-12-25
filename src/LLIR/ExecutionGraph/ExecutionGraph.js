import GraphBuilder from '@/ExecutionGraph/GraphBuilder';
import Subgraph from '@/ExecutionGraph/Subgraph';

import i from '@/Serializer/SerializationInfo';

// Default store (MemoryStore)
import { MemoryStore } from '@/ExecutionGraph/Store/*';

/**
 * An execution graph represents a symettric graph of execution
 *
 * @extends {SubgraphType}
 */
export default class ExecutionGraph {
    /**
     * New execution graph given store
     * @param {Class} store Method used to store graph data
     * @param {string} name Name for the primary subgraph
     */
    constructor(store = MemoryStore, name = "main") {
        /** @private */
        this.store = new store();

        /**
         * Primary subgraph
         * @type {Subgraph}
         * @readonly
         */
        this.main = new Subgraph(this, name);

        /**
         * Set of all subgraphs. See the {@link Subgraph} for more information.
         * Do not directly interface with this
         *
         * @type {Set<Subgraph>}
         * @readonly
         */
        this.subgraphs = new Map();

        /**
         * The helper-utility for creating graph nodes.
         * @type {GraphBuilder}
         */
        this.make = new GraphBuilder(this);
    }

    /**
     * Adds a subgraph
     * @param {SubgraphType} subgraph
     * @return {boolean} `true` if success, false if already added
     */
    addSubgraph(subgraph) {
        if (this.subgraphs.has(subgraph._name)) return;
        this.subgraphs.set(subgraph._name, subgraph);
    }

    /**
     * Returns subgraph for name.
     * @param {string} subgraphName - Name of desired subgraph
     * @return {?SubgraphType} `null` if not found.
     */
    subgraphForName(subgraphName) {
        return this.subgraphs.get(subgraphName) || null;
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
