import React, { Component } from 'react';
import Login from '../components/Login';
import { Navbar, Nav, NavItem, Modal, Carousel } from 'react-bootstrap';
import Router from 'next/router';

const withLogin = (WrappedComponent) => {
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.handleHide = this.handleHide.bind(this);
      this.state = {
          show: false
      };
      this.homePage = this.homePage.bind(this);
    }

    handleHide() {
      this.setState({ show: false });
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
              <NavItem eventKey={3} onClick={() => this.setState({ show: true })} style={{fontSize:"13pt"}}>
                Login
              </NavItem>
            </Nav>
          </Navbar>

          <Modal show={this.state.show} onHide={this.handleHide} style={{marginTop: "200px"}}>
            <Modal.Header closeButton>
              <Modal.Title>Login to DARTS workstation</Modal.Title>
            </Modal.Header>
            <Login/>
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

