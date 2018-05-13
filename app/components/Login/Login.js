import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Label } from 'react-bootstrap';
import style from './Login.scss';
import { login } from '../../service/darts';
import { actionUpdateToken } from '../../redux/store';
import { connect } from 'react-redux';
import Router from 'next/router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    const { username, password } = this.state;
    const token = await login(username, password);
    if (!token) {
      this.setState({ invalid: true });
    } else {
      this.props.updateToken(token);
      Router.push("/library");
    }
  }


  render() {
    const { username, password, invalid } = this.state;
    return (
      
      <form className="login">
      <style jsx global>{style}</style>
        <span className="login__brand">Login</span>
        <FormGroup
          controlId="formUsername"
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => this.setState({ username: e.target.value})}
          />
        </FormGroup>
        <FormGroup
          controlId="formPassword"
        >
          <ControlLabel>Passowrd</ControlLabel>
          <FormControl
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => this.setState({ password: e.target.value})}
          />
        </FormGroup>
        <Button onClick={this.onSubmit} className="login__submit" bsSize="large" bsStyle={invalid ? "error" : "success"}>Login</Button>
      </form>
    );
  }
}

export default connect(
  null,
  (dispatch) => (
    {
      updateToken: (token) => dispatch(actionUpdateToken(token))
    }
  )
)(Login);

