import React, { Component } from 'react';
// import Axios from 'axios';
// import API from '../services/API';
// import './App.css';

import Transaction from '../components/Transaction';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: undefined,
      data: undefined,
      txs: undefined
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const addr = this.element.value; //hacky ref way to get value of the input element without making it controlled
    const baseURL = "https://blockchain.info/multiaddr?active="; //only multiaddr seems to allow cors param
    const URL = `${baseURL}${addr}&cors=true`; //enabling cors allows it to work 

    fetch(URL)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        console.log(data.txs);
        
        this.setState({
          address: this.element.value,
          data,
          txs: data.txs
        });
    });
  }
  
  render() {
    if (this.state.data) {
       const balance = this.state.data.wallet.total_balance;
       const sent = this.state.data.wallet.total_sent;
       const received = this.state.data.wallet.total_received;
       const txs = this.state.data.txs;
      }

    return (
      <div className="App">
        <header className="App-header">
          {this.state.address ? 
            <h1 className="App-title">Blockchain Bitcoin Transactions for: {this.state.address}</h1> 
          : <h1 className="App-title">Blockchain Bitcoin Transactions</h1>}
        </header>
        <p>Enter valid Bitcoin address below</p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="bitcoin-address"> 
            <input type="text" name="bitcoin-address" ref={(el) => this.element = el} />{/* to instantiate the ref on the element*/}
          </label>
          <input type="submit" value="Click to Submit" />
        </form>
          {(this.state.data) && <p>Balance: {this.state.data.wallet.final_balance}</p>}
          {(this.state.data) && <p>Received: {this.state.data.wallet.total_received}</p>}
          {(this.state.data) && <p>Spent: {this.state.data.wallet.total_sent}</p>}
          {(this.state.txs) && <Transaction hash={this.state.data.txs[0]['hash']} total={this.state.data.txs[0]['result']} fee={this.state.data.txs[0]['fee']} />}
      </div>
    );
  }
}

export default App;
