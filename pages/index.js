import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

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
            </div>
        );
    }
}

export default DARTSView;

