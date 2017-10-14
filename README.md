# LLIR (vbeta)
LLIR is an optimizing backend which analytically generates probability graphs to
maximize fallthrough contrast between branches. LLIR outputs LLVM and has a
flexible input format so it can be used as a backend for many languages.

## Documentation
API documentation can be generated through `npm run docs` and is also [available
online](https://staging.vihan.org/LLIR/docs).

### LLIR 101
The LLIR compiler is described in a paper (todo add link). It works around
generating symmetric constraint graphs, all 'functions' having explicit
Domain and Codomain nodes which can be simultaneously constrained.

When generating code with LLIR you will generally need to do the following.

 1. Choose a model for how your program will be stored in memory. By default
     this is `MemoryStore`.
 2. Create an `ExecutionGraph` with your memory store.
 3. Create a `Subgraph` which contains your side-effect entry & exit points.
     LLIR offers LLVM intrinsics so this is not necessary.
 4. Populate your `ExecutionGraph`
 5. Create a generator (typically `Generator.LL` but you can use a different
     type of generator)
 6. Create a `Churn` object which will essentially take say how you want to
     generate the code. E.g. to a stream, or JIT-friendly formats. Generally
     you'd want `AutoChurn` or `StreamChurn`
