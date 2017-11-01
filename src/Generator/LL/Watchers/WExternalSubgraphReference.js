import ExternalSubgraphReference from '@/ExecutionGraph/Node/Atoms/ExternalSubgraphReference';
import LLWatcher from '~/Generator/LL/LLWatcher';

import * as llvm from 'llvm-node';

/**
 * Compiles an LLVM primitive node.
 *
 * @extends {LLWatcher}
 */
export default class WExternalSubgraphReference extends LLWatcher {
    
    /** @override */
    match(cursor) {
        return cursor.getNode() instanceof ExternalSubgraphReference;
    }
    
    /** @override */
    generate(data) {
        let node = data.cursor.getNode();
        node.getValue(data.ll, data.cursor);
    }
    
}
