import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Label } from 'react-bootstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {
    const { username, password, email, company } = this.state;
  }

  render(){
    const { username, password, confirmPassword, email, company, answer } = this.state;
    let invalid = username && password && confirmPassword && email && company && (answer == 5) && (password === confirmPassword) ;
    return(
      <form>
      <FormGroup style={{ backgroundColor: "white",
                          display: "flex",
                          flexDirection: "column",
                          backgroundColor:"white",
                          marginLeft: "80px",
                          marginRight: "80px",
                          marginTop: "20px",
                          marginBottom:"20px"
                        }}
          controlId="formBasicText"
      >
        <ControlLabel>Username</ControlLabel>
        <FormControl
          type="text"
          value={username}
          onChange={(e) => this.setState({ username: e.target.value})}
        />
        <FormControl.Feedback />
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type="password"
          value={password}
          onChange={(e) => this.setState({ password: e.target.value})}
        />
        <FormControl.Feedback />
        <ControlLabel>Confirm your password</ControlLabel>
        <FormControl
          type="password"
          value={confirmPassword}
          onChange={(e) => this.setState({ confirmPassword: e.target.value})}
        />
        <FormControl.Feedback />
        <ControlLabel>Email</ControlLabel>
        <FormControl
          type="text"
          value={email}
          onChange={(e) => this.setState({ email: e.target.value})}
        />
        <FormControl.Feedback />        
        <ControlLabel>Company</ControlLabel>
        <FormControl
          type="text"
          value={company}
          onChange={(e) => this.setState({ company: e.target.value})}
        />
        <FormControl.Feedback />
        <ControlLabel>Security Question</ControlLabel>
        <FormControl
          type="text"
          placeholder="How many letters are there in 'DARTS'"
          onChange={(e) => this.setState({ answer: e.target.value})}
          value={answer}
        />
        <FormControl.Feedback />
      </FormGroup>
      <Button style= {{    width: "40%",
                            marginLeft: "30%",
                            marginRight: "30%",
                            marginBottom: "50px",
                            color:"white"
                      }}
          onClick={this.onSubmit} className="login__submit" bsSize="large" bsStyle={invalid ? "success" : "error"}>Submit</Button>
    </form>
    )
  }
}

export default Register;