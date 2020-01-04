import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

import { connect } from "react-redux";
import { updateUser, updateStreamdata } from './redux/actions'

import Dashboard from './components/Dashboard';
import MainNavbar from './components/MainNavbar'

import SelectedControllerPane from './components/SelectedControllerPane';
import SelectedChillerPane from './components/SelectedChillerPane'

class App extends Component {
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
      if (response.status === 200) {
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
        <footer>
            {Object.keys(this.props.selectedComponent).filter(key => {return this.props.selectedComponent[key]}).map(activeKey => 
                {return activeKey==='Chiller' ? 
                  (<SelectedChillerPane processId={"Chiller"} key={`ActivePane-${activeKey}`}/>)
                  : 
                  (<SelectedControllerPane processId={activeKey} key={`ActivePane-${activeKey}`}/>)
                }
              )
            }
        </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user,
  streamData : state.streamdata,
  selectedComponent : state.selectedComponent
})

const mapDispatchToProps = {
  updateUser,
  updateStreamdata
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
