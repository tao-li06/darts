import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Label } from 'react-bootstrap';
import { login } from '../../service/darts';
import { actionUpdateToken } from '../../redux/store';
import { connect } from 'react-redux';
import Router from 'next/router';
import Cookies from 'js-cookie';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    const { username, password } = this.state;
    const json = await login(username, password);
    
    if (!json) {
      this.setState({ invalid: true });
    } else {
      // TODO: set expiration date
      const { token, username, description, email, id, is_admin } = json;
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('username', username, { expires: 7 });
      Cookies.set('description', description, { expires: 7 });
      Cookies.set('email', email, { expires: 7 });
      Cookies.set('id', id, { expires: 7 });
      Cookies.set('is_admin', is_admin, { expires: 7 });
      Router.push("/usergroups");
    }
  }


  render() {
    const { username, password, invalid } = this.state;
    return (
      <div style={{width:"300px"}}> 
       
      <form className="login">
      <style jsx global>{`.login {
  background-color: white ;
  padding: 30px;
  display: flex;
  flex-direction: column;

  
}

.login__brand {
  width: 150px;
  height: 50px;
  font-size: 32px;
}

.login__submit {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}`}</style>
        
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
        <Button onClick={this.onSubmit} className="login__submit" bsSize="large" bsStyle={"success"}>Login</Button>
      </form>
      </div>
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

