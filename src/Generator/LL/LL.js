import * as llvm from 'llvm-node';
import GeneratorBase from '~/Generator/GeneratorBase';
import LLEstablishPrimitives from '~/Generator/LL/LLEstablishPrimitives';

/**
 * @external {llvm.LLVMContext} http://llvm.org/doxygen/classllvm_1_1LLVMContext.html
 */

/**
 * Emits compilation-targeted LLVM. This is not for JIT as it will use global
 * resolution for optimization (i.e. will use a global program state) for branch
 * tracking.
 *
 * Supports the following special nodes:
 *  - {@link LLVMArgument}
 *  - {@link LLVMPrimitive}
 *
 * You can access the types using {@link LL#types}
 *
 * You can also override the {@link LL#watcherList} to add your own nodes to
 * this.
 *
 * @extends {GeneratorBase}
 */
export default class LL extends GeneratorBase {
    static instanceId = 'llir.ll';
    
    /**
     * Creates LL instance with a new context + module
     */
    constructor() {
        super();
        
        this._context = new llvm.LLVMContext();
        this._module = new llvm.Module("module", this._context);
        
        /** @type {LLVMPrimitives} */
        this.types = LLEstablishPrimitives(this._context);
    }
    
    /**
     * This takes a node and begins its generation. You can track state by
     * interacting with the `state` WatchMap. This is called on each context
     * shift.
     *
     * @param {Node} node the inital node for the generator
     * @param {WatchMap} state Map for navigation of state.
     * @protected
     * @override
     */
    generate(node, state) {
        
    }
    
    /**
     * Emits IR.
     * @return {string} LLVM IR string
     */
    emit() {
        return this._module.print();
    }
}
