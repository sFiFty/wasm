
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
