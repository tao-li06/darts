import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Head from 'next/head';
import Viewer from '../components/Viewer';

class DARTSView extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>DARTS</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
        </Head>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">DARTS</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Viewer />
      </div>
    );
  }
}

export default DARTSView;

