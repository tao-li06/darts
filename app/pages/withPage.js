import Router from 'next/router';
import { Navbar, Nav, NavItem, Breadcrumb} from 'react-bootstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import cookies from 'next-cookies';
import ErrorPage from 'next/error';

const format = (s) =>  s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
const withPage = (WrappedComponen) => {
  class Page extends Component {
    static async getInitialProps(ctx) {
      const props = await WrappedComponen.getInitialProps(ctx);
      return props;
    }

    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    }

    logout() {
      Cookies.remove("token");
      window.location.assign('/');
    }

    render() {
      const { children, error } = this.props;
      if (error) {     
        return (
          <ErrorPage statusCode={error} />
        );
      }
      const path = Router.asPath;
      const dirs = (path || '').split('/').filter(i => !!i);
      return (
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a className="navbar-brand"  href="/">DARTS Platform</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav bsStyle="pills">
              <NavItem eventKey={1} onClick={() => Router.push("/studies")}>
                Studies
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem onClick={this.logout}>Log Out</NavItem>
            </Nav>
          </Navbar>
          <div className="container">
            <Breadcrumb>
              {
                dirs.map((d, index) => <Breadcrumb.Item key={index} href={`/${dirs.slice(0, index + 1).join('/')}`} active={index == dirs.length - 1}>
                  {format(d)}
                </Breadcrumb.Item>)
              }
            </Breadcrumb>
            <WrappedComponen {...this.props} />
          </div>
        </div>
      );
    }
  }

  return Page;
}

export default withPage;