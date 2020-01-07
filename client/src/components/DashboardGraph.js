import React, {Component} from 'react';
import '../../../node_modules/react-vis/dist/style.css'
import { connect } from "react-redux";
import {XYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    LineSeries,
    VerticalGridLines, 
    LineMarkSeries, 
    makeWidthFlexible,
    makeHeightFlexible} from 'react-vis';
import {Card} from 'react-bootstrap'


const DashboardGraph = (props) => {
    const clientGraphData = props.graphData[props.processId]

    let mappedGraphData = []

    if (props.processId === 'Chiller') {
        mappedGraphData = (clientGraphData.slice(-10).map((e, idx) => ({
            x: idx,
            y: isNaN(e.currentFreq) ? 0 : e.currentFreq
        })))
    } else {
        mappedGraphData = (clientGraphData.slice(-10).map((e, idx) => ({
            x: idx,
            y: isNaN(e.currentTemp) ? 0 : e.currentTemp
        })))
    }

    let ydata = []

    mappedGraphData.forEach(dataPoint => {
        ydata.push(dataPoint.y)
    })
    
    return (
        <Card body>
            <XYPlot height={200} width={200}  yDomain={[Math.min(...ydata), Math.max(...ydata)]} xDomain={[0, 10]}>
                <XAxis/><YAxis/>
                <HorizontalGridLines />
                <VerticalGridLines />
                <LineSeries data={mappedGraphData} />
            </XYPlot>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    graphData : state.graphdata,
})

export default connect(mapStateToProps)(DashboardGraph);