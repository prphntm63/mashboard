import React, {Component} from 'react';
import { connect } from "react-redux";
import { updateUser, deselectAll } from './../redux/actions'
import {Button, Modal, Form, Navbar, Nav, DropdownButton, Dropdown} from 'react-bootstrap'

class MainNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            userEntry : null,
            passwordEntry : null,
        }
    }

    openModal = () => {
        this.setState({showModal : true})
    }

    closeModal = () => {
        this.setState({showModal : false})
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
                this.props.updateUser(responseJSON)
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
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    streamData : state.streamdata
})
  
const mapDispatchToProps = {
    updateUser,
    deselectAll
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);