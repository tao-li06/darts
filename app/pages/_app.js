import App, {Container} from 'next/app';
import React from 'react';
import withReduxStore from '../redux/with-redux-store';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';
import { connect } from 'react-redux';

class DARTSApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

  // componentWillMount() {
  //   if (!this.props.loggedIn) {
  //     Router.push('/');
  //   }
  // }

  render () {
    const {Component, pageProps, reduxStore} = this.props
    return <Container>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </Container>
  }
}

 export default 
//connect(
//   state => ({loggedIn: !!state.user.token})
// )(
  withReduxStore(
  
  DARTSApp
);