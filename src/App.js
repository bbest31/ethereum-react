import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
    };
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  /**
   * loadBlockchainData asynchronously retrieves
   */
  loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    console.log("network:", network);
    // Fetch account
    // must first enable/connect them from the current env
    const requestedAccounts = await web3.eth.requestAccounts();
    console.log(requestedAccounts);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({
      account: accounts[0],
    });
  };

  render() {
    return (
      <div className="container">
        <h1>ETH + React Todo List</h1>
        <p>Your account: {this.state.account}</p>
      </div>
    );
  }
}

export default App;
