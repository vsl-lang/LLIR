import DirectMap from '@/ExecutionGraph/Node/Atoms/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Represents a primitive LLVM command (e.g. `add [i32 foo, bar]`).
 * @extends {DirectMap}
 */
export default class LLVMPrimitive extends DirectMap {
    static uidname = "llir.primitive";
    
    /** @override */
    init() {
        super.init();
        this.setOffsetDomain(Offset.postvoid);
        
        this._value = null;
        this._builder = null;
    }
    
    /**
     * Sets the builder to create the primitive. Takes a `LL` instance and the
     * referencing cursor.
     *
     * @param {func(ll:LL,ref:Cursor)} builder - builder lambda.
     * @return {boolean} `true` if set, `false` if not (already has builder).
     */
    setBuilder(builder) {
        if (this._builder !== null) return false;
        this._builder = builder;
        return true;
    }
    
    /**
     * Gets the LLVMPrimitive and returns it.
     * @param {LL} ll
     * @param {Cursor} ref - ref of cursor calling this
     *
     * @return {llvm.*}
     */
    getValue(ll, ref) {
        if (this._value !== null) return this._value;
        return this._value = this._builder(ll, ref);
    }
}
