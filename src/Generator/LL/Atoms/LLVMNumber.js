import Value from '@/ExecutionGraph/Node/Atoms/Value';
/**
 * Represents any number (integer or float) for LLVM. Specify type as a
 * {@link llvm.IntegerType}.
 *
 * @extends {Value}
 */
export default class LLVMNumber extends Value {
    static uidname = 'llir.ll.number';
    
    /** @override */
    init() {
        super.init();
        this._type = null;
    }
    
    /**
     * Sets the type of this node
     * @param {llvm.IntegerType} type - type
     * @return {boolean} true if set, false if could not be.
     */
    setType(type) {
        if (this._type !== null) return false;
        this._type = type;
        return true;
    }
}
