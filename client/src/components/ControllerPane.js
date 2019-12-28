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

        if (evt.target.id === "stir") {

        } else if (evt.target.id === "mode") {

        } else {
            newClientData[this.props.processId][evt.target.id] = evt.target.value
        }

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
                                <Form.Label>Current Temperature</Form.Label>
                                <Form.Control type="text" disabled value={controllerProcessData.currentTemp}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Last Updated</Form.Label>
                                <Form.Control type="text" disabled value={controllerProcessData.ctime}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Set Temperature</Form.Label>
                                <Form.Control type="number" id={"setTemp"} value={clientProcessData.setTemp} onChange={this.handleParamChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Batch</Form.Label>
                                <Form.Control type="text" id={"batch"} value={clientProcessData.batch} onChange={this.handleParamChange}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Mode</Form.Label>
                                <Form.Control type="text" id={"mode"} value={clientProcessData.mode} onChange={this.handleParamChange}></Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Hysterisis</Form.Label>
                                <Form.Control type="number" id={"hys"} value={clientProcessData.hys} onChange={this.handleParamChange}></Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Check type="switch" id={"stir"} label="Stirring" checked={clientProcessData.stir} onChange={this.handleParamChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Stir Speed</Form.Label>
                                <Form.Control type="number" id={"stirSpeed"} value={clientProcessData.stirSpeed} onChange={this.handleParamChange}></Form.Control>
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