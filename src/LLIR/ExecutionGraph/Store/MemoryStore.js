/**
 * A primitive in-memory basic store format
 */
export default class MemoryStore {
    constructor() {
        this.nodes = new Set();
        this.subgraphs = new WeakSet();
    }
}
