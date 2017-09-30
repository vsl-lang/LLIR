/**
 * Manages a state for a {@link WatchMap}. This is generally created by a
 * {@link WatchMap} but you can create one (e.g. for a new graph.)
 *
 * ## Usage
 *
 * This is designed to be immuatble by the user. You use {@link WatchMap} to
 * handle all interactions.
 */
export default class WatchState {
    /**
     * The graph (should be same as WatchMap to setup for. You can also use the
     * {@link WatchMap#createEmptyState} to create a state.
     *
     * @param  {ExecutionGraph} graph - Graph to setup for
     */
    constructor(graph) {
        this.main = graph;
        this.node = graph.main.body.entry;
    }
}
