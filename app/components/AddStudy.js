import React, { Component } from 'react';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';
import { addStudy} from '../service/darts';

class AddStudy extends Component {
  constructor(props) {
    super(props);  // this.props = props;
    this.state = { state: 0,};
    this.changeState = this.changeState.bind(this);
  }


  changeState(state) {
    this.setState({ state });
  }

  async addAStudy() {
    const {onAdded } = this.props;
    const { name, description, label} = this.state;
    const success = await addStudy(name, description, label);
    if(success) {
      this.setState({state: 0});
      if(this.props.onAdded) await this.props.onAdded();
    }
    else this.setState({state: 1});
  }

  render() {
    const { state, name, description, label, onAdded } = this.state;
    return (
      <li style={{height: state == 1 ? "280px" : "100px"}} className="add-study list-group-item">
        <style jsx>{`
          .add-study {
            transition: height 0.5s ease;
            overflow: hidden;
          }
        `}</style>
        {
          state == 0 && <Button bsStyle="primary" onClick={() => this.changeState(1)}> Create a new study</Button>
        }
        {
          state == 1 && (
            <form>
              <FormGroup
                controlId="formUsername"
              >
                <ControlLabel> &nbsp;Study Name</ControlLabel>
                <FormControl
                  type="text"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value})}
                />
              </FormGroup>
              <FormGroup
                controlId="formUsername"
              >
                <ControlLabel> &nbsp;Study Description</ControlLabel>
                <FormControl
                  type="text"
                  value={description}
                  onChange={(e) => this.setState({ description: e.target.value})}
                />
              </FormGroup>
              <FormGroup
                controlId="formUsername"
              >
                <ControlLabel> &nbsp;Label</ControlLabel>
                <FormControl
                  type="text"
                  value={label}
                  onChange={(e) => this.setState({ label: e.target.value})}
                />
              </FormGroup>
              <div>
              <Button bsStyle="success" style={{marginLeft:"5px"}} onClick={() => {
                if(!description && !name){
                  alert("Add name and description")
                } else if(!name) {
                  alert("Add a name")
                } else if(!description) {
                  alert("Add a description")
                } else {
                this.changeState(2);
                this.addAStudy();
                }
              }}>Add</Button>
              <Button bsStyle="info" onClick={() => this.changeState(0)} style={{marginLeft:"10px"}}>Cancel</Button>
              </div>
            </form>
          )
        }
        {
          state == 2 && (
            <ScaleLoader color="green"/>
          )
        }
      </li>
    )
  }
}


export default AddStudy;