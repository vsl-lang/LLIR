import GraphMap from '@/ExecutionGraph/GraphMap';
import WatchState from '~/Generator/WatchState';

/**
 * Manages state for handling watch behavior. You want to subclass this and
 * override the {@link WatchMap#compileNode} to specify how to compile a node.
 * This handles navigation for moving on the graph.
 *
 * When you visit a node, it is compiled. Originally the primary node is
 * compiled but you could implement lazy compilation for navigation for JIT
 * for example.
 *
 * ## Usage
 * This begins at the graph's first position (node). This will call
 * {@link Node#notify} when applicable _before_ the return of the graph.
 *
 * You'll want an engine to manage returning of partially compilied objects.
 *
 * @extends {GraphMap}
 * @implements {WatchStateDelegate}
 */
export default class WatchMap extends GraphMap {
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
     * @override
     */
    makeState(node, instance) {
        let state = new WatchState(node, instance);
        state.setParentMap(this);
        return state;
    }
    
    /** @override */
    interact(node) {
        
    }
}
