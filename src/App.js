import React, { Component } from 'react';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: undefined
    };
  }

  handleChange(e) {
    this.setState({
      address: e.target.value
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.address ? 
            <h1 className="App-title">Blockchain Bitcoin Transactions for: {this.state.address}</h1> 
          : <h1 className="App-title">Blockchain Bitcoin Transactions</h1>}
        </header>
        <p>Enter bitcoin address:</p>
        <input type="text" value={this.state.address} onChange={(e) => this.handleChange(e)} />
      </div>
    );
  }
}

export default App;
