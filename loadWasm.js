
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

fetchAndInstantiateWasm('./toLowerCase.wasm', {
  env: {
    consoleLog (offset, len) {
      const strBuf = new Uint8Array(mem.buffer, offset, len);
      log(new TextDecoder().decode(strBuf));
    }
  }
})
.then(m => {
  const mem = m.exports.memory;
  function writeString(str, offset) {
    const strBuf = new TextEncoder().encode(str);
    const outBuf = new Uint8Array(mem.buffer, offset, strBuf.length);
    for (let i = 0; i < strBuf.length; i++) {
      outBuf[i] = strBuf[i];
    }
  }
  const str = "Hello World";
  writeString(str, wasmInstance.exports.getInStrOffset());
  wasmInstance.exports.toLowerCase();
});
