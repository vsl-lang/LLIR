import WatchState from '~/Generator/WatchState';

/**
 * Manages state for handling watch behavior. You want to subclass this and
 * override the {@link WatchMap#compileNode} to specify how to compile a node.
 * This handles navigation for moving on the graph.
 *
 * ## Usage
 * This begins at the graph's first position (node). This will call
 * {@link Node#notify} when applicable _before_ the return of the graph.
 *
 * ## Concurrency
 * Managing this with concurrency is more difficult
 *
 * ## Internal
 * This internally maintains a state which over you can save (returning a new
 * {@link WatchState} object) which you can use restore. This assumes
 * compatibility (e.g. no nodes removed.)
 *
 * ## Requirements
 * The graph should NOT be mutated while using a WatchMap. You can alternatively
 * create a {@link WatchMap}, mutate the graph, and then create a new
 * {@link WatchMap}. However an alternative is to create a new
 * {@link WatchState}, see its docs for more information.
 */
export default class WatchMap {
    /**
     * Creates a WatchMap for a certain graph.
     *
     * @param {ExecutionGraph} graph - Graph to track with WatchMap.
     */
    constructor(graph) {
        this.graph = graph;
        this.state = new WatchState(this.graph);
    }
    
    /**
     * Returns an empty new state
     * @return {WatchState} empty blank new state.
     */
    createEmptyState() {
        return new WatchState(this.graph);
    }
    
    /**
     * Returns the current state. Do not modify, only store it for later use
     * @return {WatchState} the current state
     */
    saveState() {
        return this.state;
    }
}
