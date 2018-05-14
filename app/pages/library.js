import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
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
              <a href="#">DARTS</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Library />
      </div>
    );
  }
}

export default connect(state => ({loggedin: !!state.user.token}))(DARTSView);

