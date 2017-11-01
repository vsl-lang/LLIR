import DirectMap from '@/ExecutionGraph/Node/Atoms/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Represents a primitive LLVM command (e.g. `add [i32 foo, bar]`).
 * @extends {DirectMap}
 */
export default class ExternalSubgraphReference extends DirectMap {
    static uidname = "llir.externalref";
    
    /** @override */
    init() {
        super.init();
        this._referencingSubgraph = null;
    }
    
    /**
     * Sets the subgraph referenced by this subgraph referenced. This uses an
     * external subgraph and will inherit all the appropriate data. You can only
     * set the reference once.
     *
     * @param {ExternalSubgraph} graph - external subgraph.
     * @return {boolean} `true` if set, `false` if not. Either the graph is
     *                   already set or the graph is not in the execution graph.
     */
    setRefencedSubgraph(graph) {
        if (this._referencingSubgraph !== null) return false;
        this._referencingSubgraph = graph;
        return true;
    }
}
