import React, {Component} from 'react';
import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from "react-redux";
import { updateUser, updateStreamdata } from './redux/actions'
import ControllerPane from './components/ControllerPane';
import ChillerPane from './components/ChillerPane'
import MainNavbar from './components/MainNavbar'

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
      // console.log('Socket Data Recieved -', clientData)
      this.props.updateStreamdata(clientData)
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
        this.props.updateUser(responseJson)
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
        <MainNavbar />
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
          <h2>{this.props.user.id ? `API Test Succesful! Value: ${this.props.user.firstName + ' ' + this.props.user.lastName}` : "No Response"}</h2>
          
               
        </header>
        <div>
          {this.state.socketData === null ? (<div></div>) : (
            <div className="d-flex flex-row">
              {Object.keys(this.props.streamData).map(processType => {return processType==='Chiller' ? 
              (<ChillerPane processId={"Chiller"} />)
              : 
              (<ControllerPane processId={processType} />)
              })}
            </div>
            // <div>
            //   {Object.keys(this.props.streamData).map(param => {return (
            //   <React.Fragment>
            //     <h4>{param}</h4>
            //     {Object.keys(this.props.streamData[param]).map(subparam => {return (
            //       <React.Fragment>
            //         <p>{subparam + ': ' + this.props.streamData[param][subparam]}</p>
            //       </React.Fragment>
            //     )})}
            //   </React.Fragment>
            //   )})}
            // </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user,
  streamData : state.streamdata
})

const mapDispatchToProps = {
  updateUser,
  updateStreamdata
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
