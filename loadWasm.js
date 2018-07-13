
function fetchAndInstantiateWasm (url, imports) {
  return fetch(url)
  .then(res => {
    if (res.ok)
      return res.arrayBuffer();
    throw new Error(`Unable to fetch Web Assembly file ${url}.`);
  })
  .then(bytes => WebAssembly.compile(bytes))
  .then(module => WebAssembly.instantiate(module, imports || {}))
  .then(instance => instance.exports);
}
fetchAndInstantiateWasm('./program.wasm', {
  env: {
    consoleLog: num => console.log(num)
  }
})
.then(m => {
  console.log(m.getSqrt(25));
});

let wasmMalloc, wasmFree;

fetchAndInstantiateWasm('./dynamic.wasm', {
  env: {
    malloc: len => wasmMalloc(len),
    free: addr => wasmFree(addr),
  }
})
.then(m => {
  fetchAndInstantiateWasm('./memory.wasm', {
    env: {
      memory: m.memory
    }
  })
  .then(m => {
    wasmMalloc = m.malloc;
    wasmFree = m.free;
  })
  .then(() => {
    console.log(m.createRecord(2));
    console.log(m.createRecord(5));
  })
  
});
