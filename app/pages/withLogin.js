import React, { Component } from 'react';
import Login from '../components/Login';
import { Navbar, Nav, NavItem, Modal, Grid, Col, Row, Button} from 'react-bootstrap';
import Router from 'next/router';
import Register from './register';

const withLogin = (WrappedComponent) => {
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.handleHide = this.handleHide.bind(this);
      this.handleHideCreateUserInterface = this.handleHideCreateUserInterface.bind(this);
      this.state = {
          show: false,
          showCreateAccount: false
      };
      this.homePage = this.homePage.bind(this);
    }

    handleHide() {
      this.setState({ show: false });
    }

    handleHideCreateUserInterface() {
      this.setState({ showCreateAccount: false });
    }
    homePage() {
      window.location.assign('/');
    }

    
    render() {
      return (
        <div style={{backgroundColor:"#171717"}}>
          
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">DARTS Universe</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="/how-it-works">
                How it works
              </NavItem>
              <NavItem eventKey={2} href="/our-team">
                Our team
              </NavItem>
              <NavItem eventKey={3} href="/contact-us">
                Contact us
              </NavItem>
            </Nav>
            <Nav pullRight >
              <NavItem eventKey={5} onClick={() => this.setState({ show: true })} >
                Login
              </NavItem>
            </Nav>
            <Nav pullRight >
              <NavItem eventKey={4} onClick={() => this.setState({ showCreateAccount: true })} >
                Create an account
              </NavItem>
            </Nav>
          </Navbar>

          <Modal show={this.state.showCreateAccount} onHide={this.handleHideCreateUserInterface} style={{marginTop: "100px"}}>
            <Modal.Header closeButton>
              <Modal.Title style={{fontSize:"20pt"}}>Register</Modal.Title>
            </Modal.Header>
            <Register />
          </Modal> 
          <Modal show={this.state.show} onHide={this.handleHide} style={{marginTop: "100px"}}>
            <Modal.Header closeButton>
              <Modal.Title>Login to DARTS workstation</Modal.Title>
            </Modal.Header>
            <Login />
          </Modal> 
          <div className="container">
            <WrappedComponent {...this.props}/>
          </div>
        </div>
      )
    }
  }

  return LoginPage;
}

export default withLogin;

