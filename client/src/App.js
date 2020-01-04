import React, {Component} from 'react';
import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from "react-redux";
import { updateUser, updateStreamdata } from './redux/actions'
import ControllerPane from './components/ControllerPane';
import ChillerPane from './components/ChillerPane'

import UserLogin from './components/UserLogin'
import Dashboard from './components/Dashboard';
import MainNavbar from './components/MainNavbar'

import SelectedControllerPane from './components/SelectedControllerPane';
import SelectedChillerPane from './components/SelectedChillerPane'

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
        <Dashboard />

        <div>
          {this.state.socketData === null ? (<div></div>) : (
            <div className="d-flex flex-row">
            {Object.keys(this.props.streamData).map(processType => {return processType==='Chiller' ? 
            (<ChillerPane processId={"Chiller"} />)
            : 
            (<ControllerPane processId={processType} />)
            })}
            </div>
          )}
        </div>
                <div>
          {this.state.socketData === null ? (<div></div>) : (
            <div className="">
            {Object.keys(this.props.streamData).map(processType => {return processType==='Chiller' ? 
            (<SelectedChillerPane processId={"Chiller"} />)
            : 
            (<SelectedControllerPane processId={processType} />)
            })}
            </div>
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
