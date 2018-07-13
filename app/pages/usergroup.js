import React, { Component } from 'react';
import withPage from './withPage';
import { getStudyList, addStudy, getGroupInfo, getLoggedInfo, getUsersOfGroup, deleteUserGroup, login, addUserToGroup, deleteUserFromGroup } from '../service/darts';
import {  Glyphicon, FormControl, FormGroup, Panel, Modal, Button, Table, Checkbox, Alert} from 'react-bootstrap';
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
    const gName = await getGroupInfo(groupid, token);
    const sysAdmin = is_admin == "true" ? true : false;
    var isGroupAdmin = true;
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
        groupid,
        gName
      };
    }
  
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      show: false,
      adduserAdmin: false,
      showDeleteGroup: false,
    };
    this.addAStudy = this.addAStudy.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.loginInfo = this.loginInfo.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUserFGroup = this.deleteUserFGroup.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleDeleteShow = this.handleDeleteShow.bind(this);

    //this.freshPage = this.freshPage.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleDismiss() {
    this.setState({ showDeleteGroup: false });
  }

  handleDeleteShow() {
    const {showDeleteGroup} = this.state;
    this.setState({ showDeleteGroup: !showDeleteGroup });
  }
  //checked
  async addAStudy() {
    const { name, description } = this.state;
    const { groupid, token } = this.props;
    if (validate(name, 255) && validate(description, 512 * 4)) {
      this.setState({ adding: true });
      const ok = await addStudy(name, description, groupid, token);
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
    
      const ok = addingName && await addUserToGroup(groupid, addingName, adduserAdmin, token);
    if(ok) {
      this.freshPage();
      this.handleShow();
    }
  }

  async deleteUserFGroup(deleteName) {
      const {groupid, token} = this.props;
      const ok = await deleteUserFromGroup(groupid, deleteName, token);
      if(ok) {
        this.freshPage();
      }
  }

  render(){
    const { studyLists, adding, userList, sysAdmin, isGroupAdmin, id, gName, groupid} = this.props;
    const {showDeleteGroup} = this.state;
    //todo?
    return(
      <div className="container">
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
        
        <h3 style={{color: "Black", width:"97.5%"}}>
            {gName.name}
            
            <Button style={{color: "Darkgreen", float:"right"}} onClick={this.handleShow}>User Management &nbsp;
              <Glyphicon  glyph="user"/>
            </Button>
            {sysAdmin ? (
              <Button style={{color: "MidnightBlue", float:"right", marginRight:"10px" }} onClick={this.handleDeleteShow}>Delete User Group &nbsp;
                <Glyphicon  glyph="trash"/>
              </Button> )
              : null }
        </h3>
        <p>{gName.description}</p>
        
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
                    sysAdmin ?  <Glyphicon   style={{color:"darkred", marginLeft:"20px"}} glyph="remove" onClick={() => this.deleteUserFGroup(user.name)} /> : null
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
        
        <div>
        { showDeleteGroup ?
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>Confirm to delete</h4>
            <p>
              The user group and all of its content will be deleted permanently and cannot be retrieved. Please confirm to continue.
            </p>
            <p>
              <Button onClick ={ ()=> { this.deleteGroup(); } }
                 bsStyle="danger">Delete</Button>
              <span> &nbsp; </span>
              <Button onClick={this.handleDismiss}>Cancel</Button>
            </p>
          </Alert>
          : null
        }
        </div>

        {
          studyLists && studyLists.map((study, index) => (<div>
            <Panel style={{ width:"32%", marginRight:"10px"}} key={index} >
            <Panel.Heading style={{backgroundColor:"#34495E", color:"white"}}>
              <Panel.Title >
                <Link href={`${groupid}/study/${study.id}`}>
                      <a> &nbsp; &nbsp; &nbsp;{study.name} </a>
                </Link>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body > &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{study.description}</Panel.Body>
            </Panel>
            </div>
          ))
        }
        <Panel bsStyle="success" style={{float:"left", overflow:"hidden", marginTop:"10px", width:"98%"}}>
          <Panel.Heading >
            <Panel.Title componentClass="h3">Create a Study</Panel.Title>
          </Panel.Heading>
          <Panel.Body>A study is shared only within the group, and can be edited by group members. Use default settings for DARTS csv files.</Panel.Body>
          <div  style={{alignItems:"center", marginBottom:"20px"}}>
            <FormGroup style={{float: "left", width:"30%", marginLeft:"20px", marginBottom:"20px"}} validationState={validate(this.state.name, 255) ? "success" : "error" }>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="Study Name"
                onChange={(e) => this.setState({ name: e.target.value})}
              />
              </FormGroup>
            <FormGroup style={{float: "left", width:"30%", marginLeft:"20px", marginBottom:"20px"}} validationState={validate(this.state.description, 512 * 4) ? "success" : "error" }>
                <FormControl 
                type="text"
                value={this.state.description}
                placeholder="Study Description"
                onChange={(e) => this.setState({ description: e.target.value})}
              />
            </FormGroup>
            <Glyphicon style={{ float: "left", marginLeft:"15px", color:"Darkgreen", fontSize: "27px"}} glyph="plus" onClick={this.addAStudy} />
          </div>
        </Panel>
      </div>
    );
    
  }
  
}

export default withPage(Usergroup);