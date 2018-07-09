import React, { Component } from 'react';
import {  Glyphicon, FormControl, FormGroup, Panel} from 'react-bootstrap';
import { addGroup, getUserGroupList} from '../service/darts';
import withPage from './withPage';
import { ScaleLoader} from 'react-spinners';
import cookies from 'next-cookies';
import Link from 'next/link';

const validate = (s, l) => s && s.length <= l;

class Usergroups extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { res } = ctx;
   const userGroups = await getUserGroupList(token);
   return { userGroups };
    // if (!userGroups) {
    //   return { error: 404 };
    // } else {
    //   return {
    //     userGroups
    //   };
    // }
  }

  constructor(props) {
    super(props);
    const{userGroups} = this.props;
    this.addUserGroup = this.addUserGroup.bind(this);
    this.state = { 
      adding: false,
      numOfGroups: userGroups.length,

     };
  }

  async addUserGroup() {
    const { name, description} = this.state;
    if (validate(name, 255) && validate(description, 512 * 4)) {
      this.setState({ adding: true });
      const ok = await addGroup(name, description);
      this.setState({ adding: false });
      if (ok) {
        this.freshPage();
      }
    }
  }


  freshPage() {
    const url = window.location.href;
    window.location.href = url;
  }


  render(){
    const { adding } = this.state;
    const { userGroups } = this.props;

    return(
      <div>
        <style jsx global>{`
          th {
            vertical-align: middle !important;
          }
          .form-group {
            margin-bottom: unset;
          }
          .table-responsive {
            margin-top: 40px;
          }
        `}</style>
        <h3 style={{color:"black", marginBottom:"20px"}}>
            &nbsp;&nbsp; List Of User Groups 
            
        </h3>


        {adding && (
          <div style={{display: "flex", justifyContent: "center" }}>
            <ScaleLoader color="4A7443" />
          </div>
        )}
        {
          userGroups && userGroups.map((group, index) => (
            <Panel style={{float: "left", width:"32%", marginRight:"10px"}} key={index} bsStyle="warning">
            <Panel.Heading>
              <Panel.Title componentClass="h3" >
                <Link href={`/usergroup/${group.id}`}>
                      <a> {group.name} </a>
                </Link>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>{group.description}</Panel.Body>
            </Panel>
          ))
        }
        <Panel bsStyle="info" style={{float:"left", overflow:"hidden", marginTop:"10px", width:"98%"}}>
          <Panel.Heading >
            <Panel.Title componentClass="h3">Create a User Group</Panel.Title>
          </Panel.Heading>
          <Panel.Body>User Groups are used to manage your team members' access to studies. A study can only be viewed and edited by authorized users.</Panel.Body>
            <div  style={{alignItems:"center", marginBottom:"20px"}}>
            <FormGroup style={{float: "left", width:"30%", marginLeft:"20px", marginBottom:"20px"}} validationState={validate(this.state.name, 255) ? "success" : "error" }>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="Group Name"
                onChange={(e) => this.setState({ name: e.target.value})}
              />
              </FormGroup>
            <FormGroup style={{ float: "left", width:"30%", marginLeft:"20px", marginBottom:"20px"}} validationState={validate(this.state.description, 512 * 4) ? "success" : "error" }>
                <FormControl 
                type="text"
                value={this.state.description}
                placeholder="Group Description"
                onChange={(e) => this.setState({ description: e.target.value})}
              />
            </FormGroup>
            <Glyphicon style={{ float: "left", marginLeft:"15px", color:"#4A7443", fontSize: "27px"}} glyph="plus" onClick={this.addUserGroup} />
          </div>
        </Panel>
      </div>
    );
  }
}

export default withPage(Usergroups);