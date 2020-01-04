import React, {Component} from 'react';
import { connect } from "react-redux";
import {Row, Col, Badge} from 'react-bootstrap'

import { selectComponent } from './../redux/actions'

import MashSvg from './MashSvg'
import FermSvg from './FermSvg'
import StillSvg from './StillSvg'
import ChillSvg from './ChillSvg'

const processes = ["Mash", "Ferm1", "Ferm2", "Still", "Chiller"]

class Dashboard extends Component {

    handleSelectProcess = (evt) => {
        evt.preventDefault()
        this.props.selectComponent(evt.currentTarget.getAttribute('processlabel'))
    }

    render = () => {

        return(
            <div className="d-flex flex-row dashboard">
                {processes.map(currentProcess => (
                    <div key={`dashboard-${currentProcess}`} className="d-flex flex-column dashboard-item justify-content-between mb-3 pt-0 mt-0" style={{width : `${100/processes.length}%`}}>
                        <div className="d-flex flex-column justify-content-center pt-0 mt-0">
                            <div className="text-center mt-0" style={{backgroundColor : this.props.selectedComponent[currentProcess] ? "#FBB040" : "#cccccc", fontSize : "26px"}}>{currentProcess.toUpperCase()}</div>
                            {currentProcess === "Chiller" ? 
                                (<ChillerParams {...this.props} currentProcess={currentProcess}/>) 
                            : 
                                (<ControllerParams {...this.props} currentProcess={currentProcess}/>)
                            }
                        </div>
                        <div className="text-center mt-5" processlabel={currentProcess} onClick={this.handleSelectProcess}>
                            {{
                                "Mash": (
                                    <MashSvg 
                                        mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : this.props.clientData[currentProcess].mode} 
                                        selected={this.props.selectedComponent[currentProcess]}
                                    />
                                ),
                                "Ferm1": (
                                    <FermSvg 
                                        mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : this.props.clientData[currentProcess].mode} 
                                        selected={this.props.selectedComponent[currentProcess]}
                                    />
                                ),
                                "Ferm2": (
                                    <FermSvg 
                                        mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : this.props.clientData[currentProcess].mode} 
                                        selected={this.props.selectedComponent[currentProcess]}
                                    />
                                ),
                                "Still": (
                                    <StillSvg 
                                        mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : this.props.clientData[currentProcess].mode} 
                                        selected={this.props.selectedComponent[currentProcess]}
                                    />
                                ),
                                "Chiller": (
                                    <ChillSvg 
                                        mode={this.props.streamData[currentProcess] ? this.props.streamData[currentProcess].mode : this.props.clientData[currentProcess].mode} 
                                        selected={this.props.selectedComponent[currentProcess]}
                                    />
                                ),
                                default: (
                                    <div />
                                )
                            }[currentProcess]}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const ControllerParams = (props) => (
    <div className="mt-4" style={{padding : "0% 25%", fontSize : "18px"}}>
        <Row>
            <Col xs={8}>BATCH</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4}>
                <Badge pill variant="warning" className="w-100">
                    {props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].batch ? props.streamData[props.currentProcess].batch : "N/A") : props.clientData[props.currentProcess].batch}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8}>SET TEMP</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4}>
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
                            "warning"
                        ),
                        "run": (
                            "secondary"
                        ),
                        default: (
                            "warning"
                        )
                    }[props.streamData[props.currentProcess] ? props.streamData[props.currentProcess].mode : null]}
                    className="w-100">
                    {props.streamData[props.currentProcess] ? props.streamData[props.currentProcess].setTemp : props.clientData[props.currentProcess].setTemp}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8}>CURRENT TEMP</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4}>
                <Badge pill variant="warning" className="w-100">
                    {props.streamData[props.currentProcess] ? parseFloat(props.streamData[props.currentProcess].currentTemp).toFixed(1) : 'N/A'}
                </Badge>
            </Col>
        </Row>
    </div>
)

const ChillerParams = (props) => (
    <div className="mt-4" style={{padding : "0% 25%", fontSize : "18px"}}>
        <Row>
            <Col xs={8}>SET FREQ</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4}>
                <Badge pill variant="warning" className="w-100">
                    {props.streamData[props.currentProcess] ? (props.streamData[props.currentProcess].setFreq ? props.streamData[props.currentProcess].setFreq : "N/A") : props.clientData[props.currentProcess].setFreq}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8}>CURRENT FREQ</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4}>
                <Badge pill variant="warning" className="w-100">
                    {props.streamData[props.currentProcess] ? parseFloat(props.streamData[props.currentProcess].currentFreq).toFixed(1) : 'N/A'}
                </Badge>
            </Col>
        </Row>
        <Row>
            <Col xs={8}>POWER</Col>
            {/* <Col s={4}>34.15</div> */}
            <Col xs={4}>
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
    selectedComponent : state.selectedComponent
})

const mapDispatchToProps = {
    selectComponent
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);