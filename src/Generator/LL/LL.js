import * as llvm from 'llvm-node';
import GeneratorBase from '~/Generator/GeneratorBase';
import LLEstablishPrimitives from '~/Generator/LL/LLEstablishPrimitives';
import LLGenerationState from '~/Generator/LL/LLGenerationState';

import * as LLWatchers from '~/Generator/LL/Watchers/*';

/**
 * @external {llvm.LLVMContext} http://llvm.org/doxygen/classllvm_1_1LLVMContext.html
 */

/**
 * @external {llvm.Module} http://llvm.org/doxygen/classllvm_1_1Module.html
 */

/**
 * @external {llvm.Constant} http://llvm.org/doxygen/classllvm_1_1Constant.html
 */

/**
 * @external {llvm.FunctionType} http://llvm.org/doxygen/classllvm_1_1FunctionType.html
 */

/**
 * @external {llvm.Function} http://llvm.org/doxygen/classllvm_1_1Function.html
 */

/**
 * Emits compilation-targeted LLVM. This is not for JIT as it will use global
 * resolution for optimization (i.e. will use a global program state) for branch
 * tracking.
 *
 * ### Memory Model
 * At the moment this emits lifetime-tracked objects but for operations where
 * that is not the case this will use a LLIR Reference Count pointer which
 * references a destructor.
 *
 * ### External Subgraphs
 * For the {@link ExternalSubgraph} subgraphs, this will use external linkage,
 * meaning, it will not statically
 *
 * ### Atoms
 * Supports the following atoms:
 *  - {@link NativeReference}
 *
 * and all LL atoms.
 *
 * ### Types
 * You can access the types using {@link LL#types}
 *
 * ### Extending
 * You can also override the {@link LL#watcherList} to add your own nodes to
 * this.
 *
 * @extends {GeneratorBase}
 */
export default class LL extends GeneratorBase {
    static instanceId = 'llir.ll';
    
    /**
     * Creates LL instance with a new context + module
     *
     * @param {string} moduleName - Name of the module.
     * @param {LLEnv} env - Environment data (e.g. bitsize).
     */
    constructor(moduleName, env) {
        super();
        
        /** @type {llvm.LLVMContext} */
        this.context = new llvm.LLVMContext();
        
        /** @type {llvm.Module} */
        this.module = new llvm.Module(moduleName, this.context);
        
        /** @type {LLVMPrimitives} */
        this.types = LLEstablishPrimitives(this.context);
        
        /** @type {LLEnv} */
        this.env = env;
        
        /**
         * Main function with template `i32 main(i8** argv, i8 argc)`.
         * @type {llvm.Function}
         */
        this.main = llvm.Function.create(
            llvm.FunctionType.get(
                env.intType(this),
                [
                    env.intType(this),
                    this.types.string.getPointerTo()
                ],
                false
            ),
            llvm.LinkageTypes.InternalLinkage,
            "main",
            this.module
        );
        
        llvm.BasicBlock.create(this.context, "entry", this.main)
    }
    
    /**
     * Creates a list of new watchers to pattern match.
     *
     * You can subclass by adding:
     *
     *     *watcherList() {
     *         yield new MyWatcher();
     *         yield* super.watcherList();
     *     }
     *
     * @protected
     * @return {LLWatcher} list of new watchers which can match in each iter.
     */
    *watcherList() {
        yield new LLWatchers.WLLVMPrimitive();
    }
    
    /**
     * This takes a node and generates it. You can track state by
     * interacting with the `state` WatchMap. This is called on each context
     * shift.
     *
     * @param {Cursor} cursor the inital cursor for the generator
     * @param {WatchMap} state Map for navigation of state.
     * @protected
     * @override
     */
    generate(cursor, state) {
        for (let watcher of this.watcherList()) {
            if (watcher.match(cursor)) {
                watcher.generate(
                    new LLGenerationState(this, cursor, state)
                )
            }
        }
    }
}
