import Router from 'next/router';
import { Navbar, Nav, NavItem, Breadcrumb} from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Page extends Component {
  componentWillMount() {
    const token = Cookies.get('token');
    if (!token) {
      Router.push('/');
    }
  }

  render() {
    const { children } = this.props;
    const path = Router.asPath;
    const dirs = (path || '').split('/').filter(i => !!i);
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="navbar-brand"  href="#">DARTS Platform</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav bsStyle="pills">
            <NavItem eventKey={1} onClick={() => Router.push("/studies")}>
              Studies
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>Log Off</NavItem>
          </Nav>
        </Navbar>
        <div className="container">
          <Breadcrumb>
            {
              dirs.map((d, index) => <Breadcrumb.Item href={`/${dirs.slice(0, index + 1).join('/')}`} active={index == dirs.length - 1}>
                {d}
              </Breadcrumb.Item>)
            }
          </Breadcrumb>
          { children }
        </div>
      </div>
    );
  }
}

export default Page;