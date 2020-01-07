import React, {Component} from 'react';
import { connect } from "react-redux";
import {Row, Col, Badge} from 'react-bootstrap'

import { selectComponent } from './../redux/actions'

import MashSvg from './MashSvg'
import FermSvg from './FermSvg'
import StillSvg from './StillSvg'
import ChillSvg from './ChillSvg'

const processes = ["Mash", "Ferm1", "Ferm2", "Still", "Chiller"]
const outlineStyle = {opacity : "30%"}

class Dashboard extends Component {

    handleSelectProcess = (evt) => {
        evt.preventDefault()
        if (!this.props.streamData[evt.currentTarget.getAttribute('processlabel')]) return

        if (this.props.user.id) {
            this.props.selectComponent(evt.currentTarget.getAttribute('processlabel'))
        }
    }

    render = () => {

        return(
            <div className="d-flex flex-row dashboard h-100">
                {processes.map(currentProcess => (
                    <div key={`dashboard-${currentProcess}`} className="d-flex flex-column dashboard-item justify-content-between mb-3 pt-0 mt-0 h-100" style={{width : `${100/processes.length}%`}}>
                        <div className="text-center mt-0 link-style" style={{backgroundColor : this.props.selectedComponent[currentProcess] ? "#FBB040" : "#cccccc", fontSize : "22px"}} processlabel={currentProcess} onClick={this.handleSelectProcess}>{currentProcess.toUpperCase()}</div>
                        <div className="my-auto d-flex flex-column justify-content-between h-100" >
                            <div className="d-flex flex-column justify-content-center pt-0 mt-0">
                                {currentProcess === "Chiller" ? 
                                    (<ChillerParams {...this.props} currentProcess={currentProcess}/>) 
                                : 
                                    (<ControllerParams {...this.props} currentProcess={currentProcess}/>)
                                }
                            </div>
                            <div className="text-center mt-3 mb-auto flex-grow-1 link-style" processlabel={currentProcess} onClick={this.handleSelectProcess} >
                                {{
                                    "Mash": (
                                        <MashSvg 
                                            mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : "off"} 
                                            selected={this.props.selectedComponent[currentProcess]}
                                            stir={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].stir : false}
                                            connected={this.props.streamData[currentProcess]}
                                        />
                                    ),
                                    "Ferm1": (
                                        <FermSvg 
                                            mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : "off"} 
                                            selected={this.props.selectedComponent[currentProcess]}                                            
                                            stir={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].stir : false}
                                            connected={this.props.streamData[currentProcess]}
                                        />
                                    ),
                                    "Ferm2": (
                                        <FermSvg 
                                            mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : "off"} 
                                            selected={this.props.selectedComponent[currentProcess]}                                            
                                            stir={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].stir : false}
                                            connected={this.props.streamData[currentProcess]}
                                        />
                                    ),
                                    "Still": (
                                        <StillSvg 
                                            mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : "off"} 
                                            selected={this.props.selectedComponent[currentProcess]}                                            
                                            stir={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].stir : false}
                                            connected={this.props.streamData[currentProcess]}
                                        />
                                    ),
                                    "Chiller": (
                                        <ChillSvg 
                                            mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : "off"} 
                                            selected={this.props.selectedComponent[currentProcess]}
                                            connected={this.props.streamData[currentProcess]}
                                        />
                                    ),
                                    default: (
                                        <div />
                                    )
                                }[currentProcess]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const ControllerParams = (props) => (
    <div className="mt-4" style={{padding : "0% 25%", fontSize : "16px"}}>
        <Row>
            <Col xs={8} className="px-0 pr-3">BATCH</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4} className="px-0">
                <Badge pill 
                variant={props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].batch ? "warning" : "light") : "light"} 
                className="w-100 text-truncate"
                style={props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].batch === (props.clientData[props.currentProcess] ? props.clientData[props.currentProcess].batch : 'null') ? {} : outlineStyle) : outlineStyle}
                
                >
                    {props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].batch ? (Object.keys(props.batches).length ? props.batches[props.streamData[props.currentProcess].batch].name : "-") : "-") : "N/A"}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8} className="px-0 pr-3">SET TEMP</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4} className="px-0"
            
            >
                <Badge pill 
                    variant=
                    {{
                        "heat": (
                            "danger"
                        ),
                        "cool": (
                            "primary"
                        ),
                        "off": (
                            "light"
                        ),
                        "run": (
                            "primary"
                        ),
                        default: (
                            "warning"
                        )
                    }[props.streamData[props.currentProcess] ? props.streamData[props.currentProcess].mode : null]}
                    style={props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].setTemp === (props.clientData[props.currentProcess] ? props.clientData[props.currentProcess].setTemp : 'null') ? {} : outlineStyle) : outlineStyle}
                    className="w-100">
                    {props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].mode === "off" ? "OFF" : (props.clientData[props.currentProcess] ? props.clientData[props.currentProcess].setTemp : 'N/A')) : (props.clientData[props.currentProcess] ? props.clientData[props.currentProcess].setTemp : "N/A")}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8} className="px-0 pr-3">TEMP</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4} className="px-0">
                <Badge pill variant="warning" className="w-100">
                    {props.streamData[props.currentProcess] ? parseFloat(props.streamData[props.currentProcess].currentTemp).toFixed(1) : 'N/A'}
                </Badge>
            </Col>
        </Row>
    </div>
)

const ChillerParams = (props) => (
    <div className="mt-4" style={{padding : "0% 25%", fontSize : "16px"}}>
        <Row>
            <Col xs={8} className="px-0 pr-3">SET FREQ</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4} className="px-0">
                <Badge pill 
                variant={props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].mode === "off" ? "light" : "primary") : "light"} className="w-100"
                style={props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].freq === (props.clientData[props.currentProcess] ? props.clientData[props.currentProcess].freq : 'null') ? {} : outlineStyle) : outlineStyle}
                >
                    {props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].mode === "off" ? "OFF" : (props.clientData[props.currentProcess] ? props.clientData[props.currentProcess].freq : 'N/A')) : (props.clientData[props.currentProcess] ? props.clientData[props.currentProcess].freq : "N/A")}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8} className="px-0 pr-3">FREQ</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4} className="px-0">
                <Badge pill variant="warning" className="w-100">
                    {props.streamData[props.currentProcess] ? parseFloat(props.streamData[props.currentProcess].currentFreq).toFixed(1) : 'N/A'}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8} className="px-0 pr-3">POWER</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4} className="px-0">
                <Badge pill variant="warning" className="w-100">
                    {props.streamData[props.currentProcess] ? parseFloat(props.streamData[props.currentProcess].currentPower).toFixed(0) : 'N/A'}
                </Badge>
            </Col>
        </Row>
    </div>
)

const mapStateToProps = (state) => ({
    clientData : state.clientdata,
    streamData : state.streamdata,
    selectedComponent : state.selectedComponent,
    user : state.user,
    batches : state.batches
})

const mapDispatchToProps = {
    selectComponent
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// style={props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].setTemp === props.clientData[props.currentProcess].setTemp ? {} : outlineStyle) : outlineStyle}