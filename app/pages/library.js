import React, { Component } from 'react';
import { Navbar, Glyphicon, Nav, NavItem} from 'react-bootstrap';
import Head from 'next/head';
import Library from '../components/Library';
import { connect } from 'react-redux';
import Router from 'next/router';

class DARTSView extends Component {
  componentWillMount() {
    if(!this.props.loggedin && global.window) {
      Router.push("/");
    }
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a >DARTS</a>
            </Navbar.Brand>
            
          </Navbar.Header>
          <Nav pullRight>
            
              <NavItem href="/">Home Page
              </NavItem>
            </Nav>
        </Navbar>
        <Library />
      </div>
    );
  }
}

export default connect(state => ({loggedin: !!state.user.token}))(DARTSView);

