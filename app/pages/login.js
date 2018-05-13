import React, { Component } from 'react';
import Login from '../components/Login';


class LoginPage extends Component {
  render() {
    return (
      <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#337ab7"}}>
        <Login/>
      </div>
    )
  }
}

export default LoginPage;

