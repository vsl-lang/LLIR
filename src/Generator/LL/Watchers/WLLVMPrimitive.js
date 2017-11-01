import LLVMPrimitive from '~/Generator/LL/Atoms/LLVMPrimitive';
import LLWatcher from '~/Generator/LL/LLWatcher';

import * as llvm from 'llvm-node';

/**
 * Compiles an LLVM primitive node.
 *
 * @extends {LLWatcher}
 */
export default class WLLVMPrimitive extends LLWatcher {
    
    /** @override */
    match(cursor) {
        return cursor.getNode() instanceof LLVMPrimitive;
    }
    
    /** @override */
    generate(data) {
        let node = data.cursor.getNode();
        node.getValue(data.ll, data.cursor);
    }
    
}
