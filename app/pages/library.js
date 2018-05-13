import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Head from 'next/head';
import Library from '../components/Library';

class DARTSView extends Component {
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

export default DARTSView;

