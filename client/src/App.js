import React, {Component} from 'react';
import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response : null,
      socketData : null
    }
  }

  componentDidMount() {
    const socket = socketIOClient("http://127.0.0.1:5000")
    socket.on('client', clientData => {
      console.log('Socket Data Recieved -', clientData)
      this.setState({socketData : clientData})
    })

    fetch('./api/test')
    .then(response => {
      console.log('API call status', response.status)
      if (response.status == 200) {
        return response.json()
      } else {
        return null
      }
    })
    .then(responseJson => {
      if (responseJson) {
        this.setState({
          response : responseJson.success
        })
      } else {
        this.setState({
          response : false
        })
      }
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <h2>{this.state.response ? `API Test Succesful! Value: ${this.state.response}` : "No Response"}</h2>
          
          {this.state.socketData === null ? (<div></div>) : (
            <div>
              {Object.keys(this.state.socketData).map(param => {return (
              <React.Fragment>
                <h4>{param}</h4>
                {Object.keys(this.state.socketData[param]).map(subparam => {return (
                  <React.Fragment>
                    <p>{subparam + ': ' + this.state.socketData[param][subparam]}</p>
                  </React.Fragment>
                )})}
              </React.Fragment>
              )})}
            </div>
          )}     
        </header>
      </div>
    )
  }
}

export default App;
