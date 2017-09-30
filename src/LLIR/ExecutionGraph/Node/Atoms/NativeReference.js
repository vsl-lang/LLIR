import DirectMap from '@/ExecutionGraph/Node/Atom/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Ensure to call {@link NativeReference#setoffsetDomain} when using this. This
 * is a reference to some chunk of native code. This has input & output which
 * MUST be fullfilled
 */
export default class NativeReference extends DirectMap {
    static uidname = 'llir.atom.native';
}
