import React, {Component} from 'react';
import { connect } from "react-redux";
import { updateUser } from './../redux/actions'
import {Button, Modal, Form} from 'react-bootstrap'
import fetch from 'node-fetch';

class App extends React.Component {
    
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
            } else {
                window.alert('Logout Failed!')
            }
        })
    }

    render = () => {
        return (
            <>
                {!this.props.user.id ? 
                    (<Button type="button" onClick={this.openModal}>Login</Button>)
                    :
                    (<div>
                        {/* <img /> */}
                        <Button type="button" variant="secondary" onClick={this.handleLogout}>{this.props.user.firstName}</Button>
                        {/* <h5 onClick={this.handleLogout}>{this.props.user.firstName}</h5> */}
                    </div>)
                }
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
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <Button variant="primary" onClick={this.handleLogin}>Submit</Button>
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
    updateUser
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App);