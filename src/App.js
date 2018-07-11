import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    const WebAssembly = window.WebAssembly;
    WebAssembly.instantiateStreaming(fetch("./test.wasm"), {
      env: {
        sayHello() {
          console.log("Hello from WebAssembly!");
        },
        abort(msg, file, line, column) {
          console.error("abort called at main.ts:" + line + ":" + column);
        }
      },
      console: {
        logi(value) { console.log('logi: ' + value); },
        logf(value) { console.log('logf: ' + value); }
      }
    }).then(result => {
      const exports = result.instance.exports;
      document.getElementById("container").innerText = "Result: " + exports.add(19, 23);
    }).catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
