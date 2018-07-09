import React, { Component } from 'react';
import withPage from './withPage';
import { getStudyList, addStudy, getUser, getLoggedInfo, getUsersOfGroup, deleteUserGroup, login, addUserToGroup, deleteUserFromGroup } from '../service/darts';
import {  Glyphicon, FormControl, FormGroup, Panel, Modal, Button, Table, Checkbox} from 'react-bootstrap';
import Router from 'next/router';
import cookies from 'next-cookies';
import { ScaleLoader} from 'react-spinners';
import Link from 'next/link';


const validate = (s, l) => s && s.length <= l;

class Usergroup extends Component {
  static async getInitialProps(ctx) {
    const { token, username, description, email, id, is_admin } = cookies(ctx);
    const { asPath, req, res } = ctx;
    const groupid = req.params.id;
    const studyLists = await getStudyList(groupid, token);
    const userList = await getUsersOfGroup(groupid, token);
    const sysAdmin = is_admin == "true" ? true : false;
    var isGroupAdmin = false;
    for(let i = 0; i < userList.length; i++) {
      if(userList[i].id == id && userList[i].isAdmin == true)
        isGroupAdmin = true;
    }
      return {
        groupid,
        studyLists,
        userList,
        token,
        username, 
        description, 
        email, 
        id, 
        sysAdmin,
        isGroupAdmin,
        groupid
      };
    }
  
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      show: false,
      adduserAdmin: false,
    };
    this.addAStudy = this.addAStudy.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.loginInfo = this.loginInfo.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUserFGroup = this.deleteUserFGroup.bind(this);

    //this.freshPage = this.freshPage.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  //checked
  async addAStudy() {
    const { studyname, description } = this.state;
    const { groupid, token } = this.props;
    if (validate(studyname, 255) && validate(description, 512 * 4)) {
      this.setState({ adding: true });
      const ok = await addStudy(studyname, description, groupid, token);
      this.setState({ adding: false });
      if (ok) {
        this.freshPage();
      }
    }
  }
  //checked
  async deleteGroup() {
    const { groupid, token } = this.props;
    const ok = await deleteUserGroup(groupid, token);
    if(ok) {
      Router.push("/usergroups");
    }
  }

  freshPage() {
    const url = window.location.href;
    window.location.href = url;
  }

  async loginInfo() {
      return await getLoggedInfo();
  }

  toggleCheckbox(){
    const {adduserAdmin} = this.state;
    this.setState({ adduserAdmin : !adduserAdmin});
  }

  async addUser() {
    const { groupid, token } = this.props;
    const { addingName, adduserAdmin } = this.state;
    const ok = await addUserToGroup(groupid, addingName, adduserAdmin, token);
    if(ok) {
      this.freshPage();
      this.handleShow();
    }
  }

  async deleteUserFGroup() {
      const {groupid, token} = this.props;
      const {deleteName} = this.state;
      const ok = await deleteUserFromGroup(groupid, deleteName, token);
      if(ok) {
        this.freshPage();
      }
  }

  render(){
    const { studyLists, adding, userList, sysAdmin, isGroupAdmin, id, username, groupid} = this.props;
    
    //todo?
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
        
        <h3 style={{color: "Black", width:"97.5%", float:"left"}}>
            &nbsp;&nbsp; List Of Studies 
            <Button style={{color: "Darkgreen", float:"right"}} onClick={this.handleShow}>User Management &nbsp;
              <Glyphicon  glyph="user"/>
            </Button>
            {sysAdmin ? (
              <Button style={{color: "MidnightBlue", float:"right", marginRight:"10px" }} onClick={this.deleteGroup}>Delete Usergroup &nbsp;
                <Glyphicon  glyph="trash"/>
              </Button> )
              : <div/> }
        </h3>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Management</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table style={{alignItems: "center", float:"inline-end"}} striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Description</th>
                <th>Group Manager</th>
              </tr>
            </thead>
            <tbody>
            { 
              userList && userList.map((user, index) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.description}</td>
                <td>
                  {
                    user.isAdmin ? <Glyphicon style={{color:"darkgreen", marginLeft:"20px"}} glyph="ok"/> : null
                  }
                  {
                    sysAdmin ?  <Glyphicon  style={{color:"darkred", marginLeft:"20px"}} glyph="remove" onClick ={ 
                      ()=> {this.setState({deleteName: user.name});
                            this.deleteUserFGroup(); } }/> : null
                  }
                </td>
              </tr>
              ))
            }
            { isGroupAdmin ?
            <tr >
                <td style={{alignItems: "center"}}>
                  #
                </td>
                <td colSpan="2">
                    <FormGroup style={{float: "left", width:"100%", marginLeft:"0px"}} >
                      <FormControl 
                      type="text"
                      value={this.state.addingName}
                      placeholder= "Username"
                      onChange={(e) => this.setState({ addingName: e.target.value})}
                    />
                  </FormGroup>
                </td>
                <td>
                  <FormGroup style={{float: "left", width:"100%", marginLeft:"0px"}} >
                    <Checkbox onChange={this.toggleCheckbox} inline>Set As Group Manager</Checkbox>
                  </FormGroup>
                </td>
                <td>
                  <Button bsStyle="success" bsSize="small" style={{width:"80%", fontSize:"10pt"}} onClick={this.addUser}>Add</Button>
                </td>
              </tr>
              : null }
            </tbody>
          </Table>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        {adding && (
          <div style={{display: "flex", justifyContent: "center" }}>
            <ScaleLoader color="4A7443" />
          </div>
        )}
        
        {
          studyLists && studyLists.map((study, index) => (
            <Panel style={{float: "left", width:"32%", marginRight:"10px"}} key={index} bsStyle="primary">
            <Panel.Heading>
              <Panel.Title componentClass="h3" >
                <Link href={`${groupid}/study/${study.id}`}>
                      <a> {study.name} </a>
                </Link>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>{study.description}</Panel.Body>
            </Panel>
          ))
        }
        <Panel bsStyle="info" style={{float:"left", overflow:"hidden", marginTop:"10px", width:"98%"}}>
          <Panel.Heading >
            <Panel.Title componentClass="h3">Create a Study</Panel.Title>
          </Panel.Heading>
          <Panel.Body>A study is shared only within the group, and can be edited by group members. Use default settings for DARTS csv files.</Panel.Body>
          <div  style={{alignItems:"center", marginBottom:"20px"}}>
            <FormGroup style={{float: "left", width:"25%", marginLeft:"20px", marginBottom:"20px"}} validationState={validate(this.state.name, 255) ? "success" : "error" }>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="Study Name"
                onChange={(e) => this.setState({ name: e.target.value})}
              />
              </FormGroup>
            <FormGroup style={{float: "left", width:"25%", marginLeft:"5px"}} validationState={validate(this.state.description, 512 * 4) ? "success" : "error" }>
                <FormControl 
                type="text"
                value={this.state.description}
                placeholder="Study Description"
                onChange={(e) => this.setState({ description: e.target.value})}
              />
            </FormGroup>
            <Glyphicon style={{ float: "left", marginLeft:"15px", color:"black", fontSize: "27px"}} glyph="plus" onClick={this.addAStudy} />
          </div>
        </Panel>
      </div>
    );
    
  }
  
}

export default withPage(Usergroup);