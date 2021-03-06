import React, { Component } from 'react';
import './App.css';

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
        this.setState({
          address: this.element.value,
          balance: data.wallet.final_balance,
          sent: data.wallet.total_sent,
          received: data.wallet.total_received,
          txs: data.txs
        });
      });

    const webSocketUrl = 'wss://ws.blockchain.info/inv'; 
    const ws = new WebSocket(webSocketUrl); //opens websocket connection to blockchain
    const msg = { 
      "op" : "addr_sub",
      "addr" : this.element.value
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(msg)); //subscribes to address

      ws.send(JSON.stringify({"op":"ping_tx"})); //returns latest transaction for testing
    };

    ws.onmessage = (event) => { //handles a new transaction message
      const resp = JSON.parse(event.data);
      
      const transaction = {
        hash: resp.x.hash,
        result: resp.x.out[0]["value"],
        fee: undefined //not implemented yet
      };
      
      this.setState({ //adds the most recent transaction received to the front of txs array
        txs: [transaction].concat(this.state.txs)
      });
    };
  
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
          <button type="submit">Click to Submit!</button>
        </form>                {/* conditionally renders address info after API resolves */}
          {(this.state.txs) && <p><strong>Total Balance:</strong> {this.state.balance}</p>}    
          {(this.state.txs) && <p><strong>Total Received:</strong> {this.state.received}</p>}
          {(this.state.txs) && <p><strong>Total Sent:</strong> {this.state.sent}</p>}
          {(this.state.txs) && <TransactionList trans={this.state.txs} />}
      </div>
    );
  }
}

export default App;
