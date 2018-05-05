import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Head from 'next/head';

class DARTSView extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>DARTS</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
                </Head>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">DARTS</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}

export default DARTSView;

