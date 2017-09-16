import ExecutionGraph from '@/ExecutionGraph/ExecutionGraph';
import Generator, { Options } from '@/Generator/Generator';
import { StreamChurn } from '@/Generator/Churn/*';

let graph = new ExecutionGraph();

graph.main.body.setAtom(
    graph.make.conditional()
)

let generator = graph.generateWith( new Generator.LL())
let stream = new StreamChurn(
generator.churn( stream )

fs.createWriteStream();
