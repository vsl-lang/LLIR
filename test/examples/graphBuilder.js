import ExecutionGraph from '@/ExecutionGraph/ExecutionGraph';
import Generator, { Options } from '@/Generator/Generator';
import { StreamChurn } from '@/Generator/Churn/*';

let graph = new ExecutionGraph();
let generator = new Generator.LL();

graph.make.setPayloadSource(generator.payloadSource.sourceEmitter);

let conditional = graph.make.conditional()
let branch = conditional.branch(
    conditional
);

graph.main.getBody().setAtom(conditional);

let generatorInstance = graph.generateWith( generator )
let stream = new StreamChurn();
generatorInstance.churn( stream )
