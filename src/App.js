import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
/**
 * Main takeaway is to get familiar with the web3.js library
 * in order to build a frontend that interacts with the blockchain and smart contracts.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      taskCount: 0,
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
    // Load smart contract
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ contract: todoList });
    // use a method on the contract
    const taskCount = await todoList.methods.taskCount().call();
    this.setState({ taskCount });
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
