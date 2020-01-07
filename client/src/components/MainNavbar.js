import React, {Component} from 'react';
import { connect } from "react-redux";
import { updateUser, deselectAll, setBatches } from './../redux/actions'
import {Button, Modal, Form, Navbar, Nav, DropdownButton, Dropdown} from 'react-bootstrap'

class MainNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            showBatchModal : false,
            userEntry : null,
            passwordEntry : null,
            batchEntry : null,
            batchExist : false,
            batchDescription : null,
        }
    }

    openModal = () => {
        this.setState({showModal : true})
    }

    closeModal = () => {
        this.setState({showModal : false})
    }

    showBatchModal = () => {
        this.setState({showBatchModal : true})
    }

    closebatchModal = () => {
        this.setState({showBatchModal : false})
    }

    handleLogin = (evt) => {
        evt.preventDefault(evt)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.userEntry,
                password: this.state.passwordEntry
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return null
            }
        })
        .then(responseJSON => {
            if (responseJSON) {
                this.props.updateUser(responseJSON.user)
                this.props.setBatches(responseJSON.batches)

                this.setState({
                    userEntry : null,
                    passwordEntry : null,
                    showModal : false
                })
            } else {
                this.setState({
                    passwordEntry : null,
                })
            }
        })
    }

    handleLogout = (evt) => {
        evt.preventDefault(evt)
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then(response => {
            if (response.status === 200) {
                this.props.updateUser({
                    id : null,
                    firstName : null,
                    lastName : null,
                    email : null
                })
                this.props.deselectAll()
            } else {
                window.alert('Logout Failed!')
            }
        })
    }

    addBatch = (evt) => {
        evt.preventDefault()
        this.setState({batchExist : false})

        fetch('./api/batch')
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                return null
            }
        })
        .then(responseJson => {
            if (responseJson) {
                this.props.setBatches(responseJson.batches)
            }
        })
        .then(() => {
            if (Object.keys(this.props.batches).findIndex(batch => {return this.props.batches[batch].name === this.state.batchEntry}) >= 0) {
                this.setState({
                    batchExist : true
                })
            } else {
                console.log(this.state.batchEntry, this.state.batchDescription)
                fetch('/api/batch', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name : this.state.batchEntry,
                        description : this.state.batchDescription
                    })
                })
                .then(returnData => {
                    if (returnData.status === 200) {
                        return returnData.json()
                    } else {
                        return null
                    }
                })
                .then(newbatch => {
                    let newBatches = {...this.props.batches}
                    newBatches[newbatch.id] = newbatch
                    this.props.setBatches(newBatches)
                })
                this.closebatchModal()
            }
        })
    }

    render() {
        return (
            <>
                <Navbar style={{backgroundColor : "#FBB040"}} variant="dark" className="main-nav">
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="/img/MASHBOARD_logo.svg"
                            height="30px"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="ml-auto">
                        {!this.props.user.id ? 
                            (<Button variant="outline-dark" onClick={this.openModal}>Login</Button>)
                            :
                            (<DropdownButton variant="outline-dark" title={this.props.user.firstName} id="nav-dropdown" alignRight>
                                <Dropdown.Item onClick={this.showBatchModal}>Add Batch</Dropdown.Item>
                                <Dropdown.Item href="/batches">Batches</Dropdown.Item>
                                <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                            </DropdownButton>)
                        }
                    </Nav>
                </Navbar>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.userEntry ? this.state.userEntry : ''} onChange={(evt) => {this.setState({userEntry : evt.target.value})} } />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.passwordEntry ? this.state.passwordEntry : ''} onChange={(evt) => {this.setState({passwordEntry : evt.target.value})}} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={this.closeModal}>Close</Button>
                        <Button variant="outline-dark" style={{backgroundColor : "#FBB040"}} onClick={this.handleLogin}>Submit</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showBatchModal} onHide={this.closebatchModal}>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Batch Name</Form.Label>
                                <Form.Control isInvalid={this.state.batchExist} type="text" placeholder="Batch Name" value={this.state.batchEntry ? this.state.batchEntry : ''} onChange={(evt) => {this.setState({batchEntry : evt.target.value})} } />
                                <Form.Control.Feedback type="invalid">Batch name already exists</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Batch Name</Form.Label>
                                <Form.Control isInvalid={this.state.batchExist} as="textarea" rows="2" placeholder="Batch Name" value={this.state.batchDescription ? this.state.batchDescription : ''} onChange={(evt) => {this.setState({batchDescription : evt.target.value})} } />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={this.closebatchModal}>Close</Button>
                        <Button variant="outline-dark" style={{backgroundColor : "#FBB040"}} onClick={this.addBatch}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    streamData : state.streamdata,
    batches : state.batches
})
  
const mapDispatchToProps = {
    updateUser,
    deselectAll,
    setBatches
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);