import DirectMap from '@/ExecutionGraph/Node/Atom/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Represents a complex dynamic association of behavior and data. This tracks
 * a multi-domain but also maintains syncronization between the subgraphs this
 * declares ownership of.
 */
export default class ComplexValue extends DirectMap {
    static uidname = 'llir.atom.cplx';
    
    /** @override */
    init() {
        super.init();
        this.setOffsetDomain(Offset.prevoid);
    }
}
