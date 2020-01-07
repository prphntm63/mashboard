import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import isEqual from "react-fast-compare"
import { connect } from "react-redux";
import { updateClientStreamOut, deselectComponent } from '../redux/actions'

import { Button, Image, Card, Form, Col } from 'react-bootstrap'

class ControllerPane extends Component {

    componentDidUpdate = (prevProps) => {
        if (!isEqual(prevProps.clientData[this.props.processId], this.props.clientData[this.props.processId])) {
            console.log('sending event')

            const socket = socketIOClient()
            // const socket = socketIOClient("http://127.0.0.1:5000")
            socket.on('connect', () => {
                socket.emit('clientdata', this.props.clientData)
            })
        }
    }

    handleParamChange = (evt) => {
        if (!this.props.user.id) return

        console.log('Sending Event - ', this.props.processId, evt.target.id, evt.target.value)
        let newClientData = {...this.props.clientData}

        if (evt.target.id.slice(0,4) === "stir") {
            newClientData[this.props.processId][evt.target.id.slice(0,4)] = evt.target.checked
        } else {
            newClientData[this.props.processId][evt.target.id] = evt.target.value
        }

        this.props.updateClientStreamOut(newClientData)

        const socket = socketIOClient()
        // const socket = socketIOClient("http://127.0.0.1:5000")
        socket.on('connect', () => {
            socket.emit('clientdata', newClientData)
        })
    }

    closeProcessWindow = (evt) => {
        evt.preventDefault()
        this.props.deselectComponent(evt.currentTarget.getAttribute('selectedprocess'))
    }

    render = () => {
        const controllerProcessData = this.props.streamData[this.props.processId]
        const clientProcessData = this.props.clientData[this.props.processId]

        return (
            // <Jumbotron className='selectedPane'>
                
                <Card className='shadow-lg selected-card'>
                    <Card.Body>
                        <Button variant='outline-dark' className='float-right' selectedprocess={this.props.processId} onClick={this.closeProcessWindow}>X</Button>

                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Card body><Image fluid src="https://miro.medium.com/max/982/1*bC5vMtpWz7qCFuSaD02lFg.gif"/></Card>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Current Temperature</Form.Label>
                                    <Form.Control  className="rounded-pill gold"  size="lg" type="text" disabled value={parseFloat(controllerProcessData.currentTemp).toFixed(2)}></Form.Control>
                                    <Form.Label>Set Temperature</Form.Label>
                                    <Form.Control  className="rounded-pill gold"  size="lg"  type="number" id={"setTemp"} value={clientProcessData.setTemp} onChange={this.handleParamChange}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Updated</Form.Label>
                                    <Form.Control  className="rounded-pill gold"  size="lg"  type="text" disabled value={controllerProcessData.ctime}></Form.Control>
                                    <Form.Label>Batch</Form.Label>
                                    <Form.Control  className="rounded-pill gold"  size="lg"  as="select" id={"batch"} value={clientProcessData.batch === null ? '' : clientProcessData.batch} onChange={this.handleParamChange}>
                                        <option value={null}>Select...</option>
                                        {Object.keys(this.props.batches).map(batch => (
                                            <option key={this.props.batches[batch].id} value={this.props.batches[batch].id}>{this.props.batches[batch].name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>Hysteresis</Form.Label>
                                    <Form.Control  className="rounded-pill gold"  size="lg"  type="number" id={"hys"} value={clientProcessData.hys} onChange={this.handleParamChange}></Form.Control>
                                    <Form.Label>Mode</Form.Label>
                                    <Form.Control  className="rounded-pill gold"  size="lg"  as="select" id={"mode"} value={clientProcessData.mode} onChange={this.handleParamChange}>
                                        {this.props.processId === "Mash" || this.props.processId === "Still" ? 
                                        (<React.Fragment>
                                            <option value="off">Off</option>
                                            <option value="heat">Heat</option>
                                            <option value="cool">Cool</option>
                                        </React.Fragment>) 
                                        : 
                                        (<React.Fragment>
                                            <option value="off">Off</option>
                                            <option value="cool">Cool</option>
                                        </React.Fragment>) 
                                        }
                                        
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Stir </Form.Label>
                                    <Form.Check  size="lg" type="switch" id={`stir-${this.props.processId}`} label={"stir"} checked={clientProcessData.stir} onChange={this.handleParamChange}/>
                                    <Form.Label>Stir Speed</Form.Label>
                                    <Form.Control  className="rounded-pill gold"  size="lg" type="number" id={"stirSpeed"} value={clientProcessData.stirSpeed} onChange={this.handleParamChange}></Form.Control>
                                </Form.Group>
                            </Form.Row>
                            
                        </Form>
                    </Card.Body>
                </Card>
            // </Jumbotron>
        )
    }
}

const mapStateToProps = (state) => ({
    streamData : state.streamdata,
    clientData : state.clientdata,
    user : state.user,
    batches : state.batches
})

const mapDispatchToProps = {
    updateClientStreamOut,
    deselectComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(ControllerPane);