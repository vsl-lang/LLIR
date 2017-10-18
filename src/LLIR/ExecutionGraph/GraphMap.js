import MapState from '@/ExecutionGraph/MapState';
import Cursor from '@/ExecutionGraph/Cursor';

/**
 * The status returned when attempting to enter a node
 * @typedef {Object} EntryStatus
 * @property {number} OK - Succesfully entered
 * @property {number} EMPTY - Did not enter as node is empty.
 * @property {number} ERROR - Could not enter (e.g. has no children)
 */
export const EntryStatus = {
    OK: Symbol('EntryStatus.OK'),
    EMPTY: Symbol('EntryStatus.EMPTY'),
    ERROR: Symbol('EntryStatus.ERROR')
};

/**
 * A graph map is a tool you can use to navigate around an
 * {@link ExecutionGraph}.
 */
export default class GraphMap {
    /**
     * This creates a GraphMap which navigates around the execution graph. This
     * starts at the primary {@link Entry} node.
     *
     * @param {ExecutionGraph} graph - Graph to start on
     */
    constructor(graph) {
        this._graph = graph;
        this._stateStack = [
            this.makeState(graph.main.body.getAtom())
        ];
    }
    
    get _topState() {
        return this._stateStack[0];
    }
    
    /**
     * Creates a new {@link MapState} (or a subclass) for this GraphMap. Take a
     * look at {@link MapState}'s documentation for more information on how to
     * subclass it. If you are subclassing it, you want to override this to
     * create your new map
     *
     * @param {Node} node - The tracking node
     * @param {?IndexingInstance} instance - If you already have a correct
     *                                     IndexingInstance you can pass this
     *                                     but that is optional.
     * @return {MapState} a new state.
     * @protected
     */
    makeState(node, instance) {
        return new MapState(node, instance);
    }
    
    /**
     * Navigates to the next atomic graph. This goes either inside (nested) or
     * to the following successive item.
     *
     * Given the graph:
     * ```
     * p(A -> p(B -> C) -> D)
     * ```
     *
     * We'd return the `p(A -> ... -> D)` atomic graph. Then `null`. You can use
     * `entry` functions to enter this graph, we'd then start returning `pA`,
     * `p(B -> C)`, then `pD`
     * {@link GraphMap#nextAtom} to get nodes only in form `pX`
     *
     * @return {?Cursor} This returns the resulting node matched if exists. It may
     *                 or may not be a subgraph ref. `null` if does not exist.
     */
    next() {
        // Let's get the atom of this object
        let state = this._topState;
        
        // Ensure that we have setup the indexing instance.
        if (!state.setupIndexingInstance()) return null;
        
        let { done, value: nextNode } = state.indexingInstance.next();
        if (done === true) return null;
        else state.moveRetainingContext(nextNode);
        
        return this.getCursor();
    }
    
    /**
     * Enters the subgraph. Returns boolean if was entered. Some subgraphs do
     * not have 'children'. This **creates a new state**, if you don't know what
     * that means or you don't care that's fine. However if you are using save
     * state functions you will need to use {@link GraphMap#exit} first.
     *
     * @return {EntryStatus} Appropriate value depending on if was able to
     *                       enter node.
     */
    enter() {
        let state = this._topState;
        
        // i.e. has 'child' nodes.
        if (state.profiler.supportsSuccessiveIndexing) {
            let iterator = state.atom.atomicGraphs()
            let { done, value: entryGraph } = iterator.next();
            
            if (done === true) return EntryStatus.EMPTY;
            
            // Otherwise enter w/ EntryNode
            let newState = this.makeState(
                entryGraph.getAtom(),
                iterator
            );
            
            this._stateStack.unshift(newState);
            return EntryStatus.OK;
        } else {
            return EntryStatus.ERROR;
        }
    }
    
    /**
     * Attempts to exit the current state. Only fails if the state is the last
     * state and therefore cannot be exitted.
     *
     * @return {boolean} `true` if exited, `false` otherwise
     */
    exit() {
        if (this._stateStack.length <= 1) return false;
        this._stateStack.shift();
        return true;
    }
    
    /**
     * Resets the current state. Goes back to the first node in the current
     * list.
     */
    rewind() {
        if (this.exit()) this.enter();
    }
    
    /**
     * Returns where the {@link MapState} is (i.e. where the 'cursor') is over
     * in the graph.
     * @return {Cursor} attempts to locate a node. `null` if something went wrong
     */
    getCursor() {
        return new Cursor(this._topState?._atom);
    }
}
