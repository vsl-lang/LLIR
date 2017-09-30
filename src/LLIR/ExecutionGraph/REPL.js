#!/usr/bin/env node
import repl from 'repl';
import vm from 'vm';
import util from 'util';
import fs from 'fs';

import ExecutionGraph from '@/ExecutionGraph/ExecutionGraph';
import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
import Subgraph from '@/ExecutionGraph/Subgraph';

import Serialize from '@/Serializer/Serialize';

let graph = new ExecutionGraph();

function evaluate(cmd, context, filename, callback) {
    let res;
    try {
        res = vm.runInContext(cmd, context, { filename });
    } catch(e) {
        callback(e);
    }
    console.log(util.inspect(res, {
        colors: true,
        showHidden: false
    }) + '\n\u001B[1mGraph:\u001B[0m ' + graph.main.body.toString());
    callback(null);
}

let instance = repl.start({ prompt: 'LLIR::ExecutionGraph> ', eval: evaluate });
instance.context.g = graph;
instance.context.ExecutionGraph = ExecutionGraph;
instance.context.AtomicGraph = AtomicGraph;
instance.context.Subgraph = Subgraph;

instance.context.serialize = (file_name) => {
    if (!file_name) return 'no file name';
    
    let serializer = new Serialize()
    graph.serialize(serializer);
    
    let fd = fs.openSync(file_name, 'w');
    fs.writeSync(fd, serializer.buffer, 0, serializer.pos, 0);
    fs.closeSync(fd);
};
