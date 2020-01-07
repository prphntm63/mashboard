import React, {Component} from 'react';
import { connect } from "react-redux";
import {ListGroup, Table, Spinner} from 'react-bootstrap'

import { setBatchData } from './../redux/actions'

class Batches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBatchId : null,
            loadingState : null
        }
    }

    handleBatchSelect = (evt) => {
        this.setState({loadingState : true})
        let batchId = evt.target.getAttribute('batchid')
        fetch(`/api/batch/${batchId}`)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                this.setState({loadingState : false})
                return null
            }
        })
        .then(batchData => {
            if (!batchData) return
            this.props.setBatchData(batchId, batchData)
            this.setState({selectedBatchId : batchId})
            this.setState({loadingState : null})
        })
        
    }

    render = () => (
        <div className="h-100">
            <div className="text-left pl-3 mt-0 link-style" style={{backgroundColor: "#cccccc", fontSize : "22px"}}>BATCHES</div>
            <div className="d-flex flex-row h-100" >
                <div className="h-100 px-1" style={{width:"20%", backgroundColor:"#ccc", overflowY:"auto"}}>
                    <ListGroup variant="flush">
                        {Object.keys(this.props.batches).map(batchId => 
                            (<ListGroup.Item key={batchId} onClick={this.handleBatchSelect} batchid={batchId} active={batchId === this.state.selectedBatchId}>
                                {this.props.batches[batchId].name}
                            </ListGroup.Item>)
                        )}
                    </ListGroup>
                </div>
                <div className="flex-grow-1 h-100 pl-3" style={{overflowY : "auto"}}>
                    {this.state.selectedBatchId ? 
                    (<>
                        <h3>{this.props.batches[this.state.selectedBatchId].name.toUpperCase()}</h3>
                        <h5>{this.props.batches[this.state.selectedBatchId].description}</h5>

                        {['Mash', 'Ferm1', 'Ferm2', 'Still'].map(processType => (
                            <div key={processType}>
                                <h4>{processType.toUpperCase()}</h4>
                                {this.props.batches[this.state.selectedBatchId][processType].length ? (
                                    <Table>
                                        <thead>
                                            <tr>
                                                {Object.keys(this.props.batches[this.state.selectedBatchId][processType][0]).map(key => (<td key={key}>{key}</td>))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.batches[this.state.selectedBatchId][processType].slice(-10).map(processRow => (
                                                <tr key={processRow.id}>
                                                    {Object.keys(processRow).map(key => (<td key={key}>{processRow[key]}</td>))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                ) 
                                : 
                                (<p>No Data</p>)
                                }
                            </div>
                        ))}
                        
                        
                    </>) 
                    : 
                        (<>{this.state.loadingState ? (
                            <div className="d-flex mt-5 pt-5 justify-content-center align-content-center">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (<></>)
                            }
                        </>)
                    }
                    
                </div>
            </div>
        </div>
    )
} 



const mapStateToProps = (state) => ({
    clientData : state.clientdata,
    streamData : state.streamdata,
    selectedComponent : state.selectedComponent,
    user : state.user,
    batches : state.batches
})

const mapDispatchToProps = {
    setBatchData
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Batches);