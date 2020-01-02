import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import isEqual from "react-fast-compare"
import { connect } from "react-redux";
import { updateClientStreamOut } from './../redux/actions'

import { Card, Form, Col } from 'react-bootstrap'

class ControllerPane extends Component {
    constructor(props) {
        super(props);
        // processId = Mash / Ferm1 / etc
    }

    componentDidUpdate = (prevProps) => {
        if (!isEqual(prevProps.clientData[this.props.processId], this.props.clientData[this.props.processId])) {
            console.log('sending event')

            const socket = socketIOClient("http://127.0.0.1:5000")
            socket.on('connect', () => {
                socket.emit('clientdata', this.props.clientData)
            })
        }
    }

    handleParamChange = (evt) => {
        console.log('Sending Event - ', this.props.processId, evt.target.id, evt.target.value)
        let newClientData = {...this.props.clientData}

        newClientData[this.props.processId][evt.target.id] = evt.target.value

        this.props.updateClientStreamOut(newClientData)

        const socket = socketIOClient("http://127.0.0.1:5000")
        socket.on('connect', () => {
            socket.emit('clientdata', newClientData)
        })
    }

    render = () => {
        const controllerProcessData = this.props.streamData[this.props.processId]
        const clientProcessData = this.props.clientData[this.props.processId]

        return (
            <Card>
                <Card.Header>{this.props.processId}</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Chiller Mode</Form.Label>
                                <Form.Control as="select" id={"mode"} value={clientProcessData.mode} onChange={this.handleParamChange}>
                                    <option value={"off"}>Off</option>
                                    <option value="run">Run</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Last Updated</Form.Label>
                                <Form.Control type="text" disabled value={controllerProcessData.ctime}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Set Frequency</Form.Label>
                                <Form.Control type="number" id={"freq"} value={clientProcessData.freq} onChange={this.handleParamChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Current Frequency</Form.Label>
                                <Form.Control type="number" disabled id={"currentFreq"} value={controllerProcessData.currentFreq} ></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Max Power</Form.Label>
                                <Form.Control type="number" id={"maxPower"} value={clientProcessData.maxPower} onChange={this.handleParamChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Current Power</Form.Label>
                                <Form.Control type="number" disabled id={"currentPower"} value={controllerProcessData.currentPower}></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    streamData : state.streamdata,
    clientData : state.clientdata
})

const mapDispatchToProps = {
    updateClientStreamOut
}

export default connect(mapStateToProps, mapDispatchToProps)(ControllerPane);