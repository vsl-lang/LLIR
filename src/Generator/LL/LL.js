import GeneratorBase from '~/Generator/GeneratorBase';

/**
 * Emits compilation-targeted LLVM. This is not for JIT as it will use global
 * resolution for optimization (i.e. will use a global program state) for branch
 * tracking.
 *
 * @extends {GeneratorBase}
 */
export default class LL extends GeneratorBase {
    static instanceId = 'llir.ll';
}
