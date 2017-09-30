import DirectMap from '@/ExecutionGraph/Node/Atom/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Represents a composite value which is a 'group' of many parts. Use this for
 * consistent objects such as arrays, strings, other data types. For complex
 * types like structures and classes you might want to use {@link ComplexValue}.
 */
export default class MultiValue extends DirectMap {
    static uidname = 'llir.atom.multi';
    
    /** @override */
    init() {
        super.init();
        this.setOffsetDomain(Offset.prevoid);
    }
}
