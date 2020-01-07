import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import isEqual from "react-fast-compare"
import { connect } from "react-redux";
import { updateClientStreamOut, deselectComponent } from '../redux/actions'

import { Button, Image, Card, Form, Col } from 'react-bootstrap'

import '../../../node_modules/react-vis/dist/style.css'
import {XYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    LineSeries,
    VerticalGridLines, 
    LineMarkSeries, 
    makeWidthFlexible,
    makeHeightFlexible} from 'react-vis';

const FlexibleXYPlot = makeHeightFlexible(makeWidthFlexible(XYPlot));
class ControllerPane extends Component {

    componentDidUpdate = (prevProps) => {
        if (!isEqual(prevProps.clientData[this.props.processId], this.props.clientData[this.props.processId])) {
            // console.log('sending event')

            const socket = socketIOClient()
            // const socket = socketIOClient("http://127.0.0.1:5000")

            socket.on('connect', () => {
                socket.emit('clientdata', this.props.clientData)
            })
        }
    }

    handleParamChange = (evt) => {
        if (!this.props.user.id) return

        let newClientData = {...this.props.clientData}

        newClientData[this.props.processId][evt.target.id] = evt.target.value

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
        const clientGraphData = this.props.graphData[this.props.processId]

        // console.log(clientGraphData)

        const mappedGraphData = (clientGraphData.slice(-10).map((e, idx) => ({
            // x: e.currentPower,
            x: idx,
            y: e.currentFreq
        })))

        console.log(mappedGraphData)

        // chiller dataPoint : { currentFreq: x, currentPower: y }

        // console.log('currentFreq: ', controllerProcessData.currentFreq)
        // console.log('currentPower: ', controllerProcessData.currentPower)

        const testData = [
            {x: 1448, y: 48},
            {x: 1451, y: 45},
            {x: 1452, y: 44},
            {x: 1453, y: 49},
            {x: 1454, y: 41},
            {x: 1455, y: 47},
            {x: 1456, y: 46},
            {x: 1457, y: 43},
            {x: 1458, y: 42},
            {x: 1463, y: 40}
        ]

        return (
            // <Jumbotron className='selectedPane'>
            //     <Button variant='outline-dark' className='float-right' selectedprocess={this.props.processId} onClick={this.closeProcessWindow}>X</Button>
            //     <h2 className='text-left'>{this.props.processId}</h2>
                <Card className='shadow-lg selected-card'>
                    <Card.Body>
                        <Button variant='outline-dark' className='float-right' selectedprocess={this.props.processId} onClick={this.closeProcessWindow}>X</Button>

                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Card body>
                                        <XYPlot height={200} width={200}  yDomain={[35, 50]} xDomain={[0, 10]}>
                                            <XAxis/><YAxis/>
                                            <HorizontalGridLines />
                                            <VerticalGridLines />
                                            <LineSeries data={mappedGraphData} />
                                        </XYPlot>
                                    </Card>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Current Frequency</Form.Label>
                                    <Form.Control  type="number" disabled  size="lg" className="rounded-pill gold" id={"currentFreq"} value={parseFloat(controllerProcessData.currentFreq).toFixed(2)} ></Form.Control>
                                    <Form.Label>Set Frequency</Form.Label>
                                    <Form.Control className="rounded-pill gold"  size="lg" type="number" id={"freq"} value={clientProcessData.freq} onChange={this.handleParamChange}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>Current Power</Form.Label>
                                    <Form.Control className="rounded-pill gold"  size="lg" type="number" disabled id={"currentPower"} value={parseFloat(controllerProcessData.currentPower).toFixed(2)}></Form.Control>
                                    <Form.Label>Max Power</Form.Label>
                                    <Form.Control className="rounded-pill gold"  size="lg" type="number" id={"maxPower"} value={clientProcessData.maxPower} onChange={this.handleParamChange}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Updated</Form.Label>
                                    <Form.Control  className="rounded-pill gold" size="lg" type="text" disabled value={controllerProcessData.ctime}></Form.Control>
                                    <Form.Label>Chiller Mode</Form.Label>
                                    <Form.Control className="rounded-pill gold" size="lg"  as="select" id={"mode"} value={clientProcessData.mode} onChange={this.handleParamChange}>
                                        <option value={"off"}>Off</option>
                                        <option value="run">Run</option>
                                    </Form.Control>
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
    graphData : state.graphdata,
    user : state.user
})

const mapDispatchToProps = {
    updateClientStreamOut,
    deselectComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(ControllerPane);