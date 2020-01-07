import React, {Component} from 'react';
import { connect } from "react-redux";
import {ListGroup} from 'react-bootstrap'

import { selectComponent } from './../redux/actions'

class Batches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBatchId : null
        }
    }

    handleBatchSelect = (evt) => {
        this.setState({selectedBatchId : evt.target.getAttribute('batchid')})
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
                <div className="flex-grow-1 h-100">
                    {this.state.selectedBatchId ? 
                    (<>
                        <h3>{this.props.batches[this.state.selectedBatchId].name}</h3>
                        <h5>{this.props.batches[this.state.selectedBatchId].description}</h5>
                    </>) 
                    : 
                    (<></>)
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
    selectComponent
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Batches);