import DirectMap from '@/ExecutionGraph/Node/Atom/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Represents a simple static value. This will handle domain and all other
 * things. Use this for values like bytes, pointers, arrays, etc. Strings are
 * based placed as a {@link MultiValue} so their contents can be tracked too but
 * that is optional. Additionally you may want to describe how to collapse
 * certain values so they can be optimized.
 */
export default class Value extends DirectMap {
    static uidname = 'llir.atom.value';
    
    /** @override */
    init() {
        super.init();
        this.setOffsetDomain(Offset.prevoid);
    }
}
