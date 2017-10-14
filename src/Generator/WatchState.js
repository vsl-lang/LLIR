import GraphMap from '@/ExecutionGraph/MapState';

/**
 * A {@link WatchMap}'s state. This has some tools which allow it to notify
 * and interact with nodes.
 *
 * @extends {MapState}
 */
export default class WatchState extends GraphMap {
    _parentMap = null;
    
    /**
     * Sets the parent {@link WatchMap} for this node. If you which to change
     * the {@link WatchMap} after it has been set you must use. The map must
     * implement {@link WatchStateDelegate}.
     *
     * {@link WatchState#disownParentMap}
     * @param {WatchStateDelegate} parent - Parent WatchMap
     * @return {boolean} `true` if success, `false` otherwise.
     */
    setParentMap(parent) {
        if (this._parentMap) return false;
        this._parentMap = parent;
        return true;
    }
    
    /**
     * Disowns the current parent map as set by {@link WatchState#setParentMap}.
     *
     * @param {WatchStateDelegate} parent - supposed parent to disown.
     * @return {boolean} `true` if success, `false` otherwise.
     */
    disownParentMap(parent) {
        if (this._parentMap !== parent) return false;
        this._parentMap = null;
        return true;
    }
    
    /**
     * Sets the new atom which must be in the same context
     * @param {Node} node - The node to move to
     * @override
     */
    moveRetainingContext(node) {
        super.moveRetainingContext(node);
        this.parentMap?.interact(node);
    }
}
