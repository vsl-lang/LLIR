import ExecutionGraph from '@/ExecutionGraph/ExecutionGraph';
import Generator, { Options } from '@/Generator/Generator';
import { StreamChurn } from '@/Generator/Churn/*';

let graph = new ExecutionGraph();

let conditional = graph.make.conditional()
let branch = conditional.branch(
    condition
);

graph.main.body.setAtom(conditional);

let generator = graph.generateWith( new Generator.LL())
let stream = new StreamChurn(
generator.churn( stream )

fs.createWriteStream();
