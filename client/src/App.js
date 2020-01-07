import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { updateUser, updateStreamdata, updateClientStreamOut, addDataPoint, setBatches } from './redux/actions'

import Dashboard from './components/Dashboard';
import MainNavbar from './components/MainNavbar'
import Batches from './components/Batches'
import Settings from './components/Settings'

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
    // const socket = socketIOClient("http://127.0.0.1:5000")
    const socket = socketIOClient();

    socket.on('client', clientData => {
      // console.log('Socket Data Recieved -', clientData)
      this.props.addDataPoint(clientData)
      this.props.updateStreamdata(clientData)
      this.setState({socketData : clientData})

      let modifiedClientData = {...clientData}
      let updatedClientData = {}

      for (var processType in modifiedClientData) {
        if (this.props.clientData[processType]) {
          updatedClientData[processType] = this.props.clientData[processType]
        } else {
          if (processType === "Chiller") {
            delete modifiedClientData[processType].currentPower
            delete modifiedClientData[processType].currentFreq
            delete modifiedClientData[processType].ctime
          } else {
            delete modifiedClientData[processType].currentTemp
            delete modifiedClientData[processType].ctime
          }

          updatedClientData[processType] = modifiedClientData[processType]
        }
      }

      this.props.updateClientStreamOut(updatedClientData)

    })

    fetch('./api/batch')
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
        this.props.updateUser(responseJson.user)
        this.props.setBatches(responseJson.batches)
        this.setState({
          response : true
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
      <Router>
        <div className="App">
          <MainNavbar />
          <Switch>
            <Route path="/settings" 
              render={this.props.user.id ? () => (<Settings />) : ()=>(<Redirect to="/" />)}>
            </Route>
            <Route path="/batches"
              render={this.props.user.id ? () => (<Batches />) : ()=>(<Redirect to="/" />)}>
            </Route>
            <Route path="/" exact>
              <Dashboard />
              <div className="selected-component">
                  {Object.keys(this.props.selectedComponent).filter(key => {return this.props.selectedComponent[key]}).map(activeKey => 
                      {return activeKey==='Chiller' ? 
                        (<SelectedChillerPane processId={"Chiller"} key={`ActivePane-${activeKey}`}/>)
                        : 
                        (<SelectedControllerPane processId={activeKey} key={`ActivePane-${activeKey}`}/>)
                      }
                    )
                  }
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user,
  streamData : state.streamdata,
  clientData :  state.clientdata,
  selectedComponent : state.selectedComponent
})

const mapDispatchToProps = {
  updateUser,
  updateStreamdata,
  updateClientStreamOut,
  addDataPoint,
  setBatches
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
