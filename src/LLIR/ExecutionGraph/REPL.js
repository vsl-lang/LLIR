#!/usr/bin/env node
import repl from 'repl';
import vm from 'vm';
import util from 'util';
import fs from 'fs';

import ExecutionGraph from '@/ExecutionGraph/ExecutionGraph';
import AtomicGraph from '@/ExecutionGraph/AtomicGraph';
import Subgraph from '@/ExecutionGraph/Subgraph';
import GraphMap from '@/ExecutionGraph/GraphMap';
import Cursor from '@/ExecutionGraph/Cursor';

import Serialize from '@/Serializer/Serialize';

let graph = new ExecutionGraph();
let map = null;

function stripAnsi(string) {
    return string.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "")
}

function evaluate(cmd, context, filename, callback) {
    let res;
    try {
        res = vm.runInContext(cmd, context, { filename });
    } catch(e) {
        callback(e);
    }
    
    let finalResult = res instanceof Cursor ? "" : util.inspect(res, {
        colors: true,
        showHidden: false
    }) + '\n';
    
    let head = '\u001B[1mGraph:\u001B[0m ' + graph.main.body.toString();
    
    let cursorEnd = "";
    if (res instanceof Cursor) {
        let fixedHead = stripAnsi(head);
        let fixedRes = stripAnsi(res.toString())
        cursorEnd = "\n" + " ".repeat(fixedHead.indexOf(fixedRes)) + "\u001B[1m" + "^".repeat(fixedRes.length) + "\u001B[0m";
    }
    
    console.log(
        finalResult + head + cursorEnd
    );
    callback(null);
}

let instance = repl.start({ prompt: 'LLIR::ExecutionGraph> ', eval: evaluate });
instance.context.g = graph;
instance.context.ExecutionGraph = ExecutionGraph;
instance.context.AtomicGraph = AtomicGraph;
instance.context.Subgraph = Subgraph;
instance.context.GraphMap = GraphMap;

instance.context.setPreset = (num) => {
    [
        () => {
            let c = graph.make.conditional();
            graph.main.body.setAtom(c);
            let a = new AtomicGraph();
            let b1 = c.branch(a);
            c.globalConstraint.recursionEntry.setRecursionDepth(1)
        }
    ][num]();
};

instance.context.serialize = (file_name) => {
    if (!file_name) return 'no file name';
    
    let serializer = new Serialize()
    graph.serialize(serializer);
    
    let fd = fs.openSync(file_name, 'w');
    fs.writeSync(fd, serializer.buffer, 0, serializer.pos, 0);
    fs.closeSync(fd);
};

instance.context.explore = () => {
    instance.context.m = map = new GraphMap(graph);
};
