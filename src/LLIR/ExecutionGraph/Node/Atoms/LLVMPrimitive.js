import DirectMap from '@/ExecutionGraph/Node/Atom/DirectMap';
import Offset from '@/Offset/Offset';

/**
 * Represents a primitive LLVM command (e.g. `add [i32 foo, bar]`).
 * @extends DirectMap
 */
export default class LLVMPrimitive extends DirectMap {
    static uidname = "llir.primitive";
    
    /** @override */
    init() {
        super.init();
        this.setOffsetDomain(Offset.postvoid);
        
        this.command = null;
        this.args = [];
    }
    
    /**
     * Sets the node's primary command name.
     * @param {string} name - Command name to set
     * @return {boolean} `true` if set, `false` if not (already has name).
     */
    setCommand(name) {
        if (this.command !== null) return false;
        this.command = name;
        return true;
    }
    
    /**
     * Pushes an argument. These are comma-seperated e.g. if you pushed `foo`
     * and `bar` for command `baz` it would output: `foo bar, baz`. You may want
     * to consider also using {@link LLVMPrimitive#setType} or a subclass.
     *
     * @param {LLVMArgument} arg - arg to push.
     */
    addArg(arg) {
        this.args.push(arg);
    }
}
