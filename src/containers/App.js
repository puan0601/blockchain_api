import React, { Component } from 'react';

// import './App.css';
import TransactionList from '../components/TransactionList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: undefined,
      balance: undefined,
      sent: undefined,
      received: undefined,
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
          balance: data.wallet.final_balance,
          sent: data.wallet.total_sent,
          received: data.wallet.total_received,
          txs: data.txs
        });
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
        <p>Enter valid Bitcoin address below</p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="bitcoin-address"> 
            <input type="text" name="bitcoin-address" ref={(el) => this.element = el} />{/* to instantiate the ref on the element*/}
          </label>
          <input type="submit" value="Click to Submit" />
        </form>
          {(this.state.txs) && <p>Total Balance: {this.state.balance}</p>}
          {(this.state.txs) && <p>Total Received: {this.state.received}</p>}
          {(this.state.txs) && <p>Total Sent: {this.state.sent}</p>}
          {(this.state.txs) && <TransactionList trans={this.state.txs} />}
      </div>
    );
  }
}

export default App;
