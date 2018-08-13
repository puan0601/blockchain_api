import React, { Component } from 'react';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: undefined,
      data: undefined
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      address: this.element.value
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
        <h2>Enter Bitcoin address below</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="bitcoin-address"> 
            <input type="text" name="bitcoin-address" ref={(el) => this.element = el} />
          </label>
          <input type="submit" value="Click to Submit" />
        </form>
      </div>
    );
  }
}

export default App;
