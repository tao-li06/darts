import React, { Component } from 'react';
import withPage from './withPage';
import { getStudyList, addStudy } from '../service/darts';
import {  Glyphicon, FormControl, FormGroup, Panel} from 'react-bootstrap';
import Router from 'next/router';
import cookies from 'next-cookies';
import { ScaleLoader} from 'react-spinners';
import Link from 'next/link';


const validate = (s, l) => s && s.length <= l;

class Usergroup extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { asPath, req, res } = ctx;
    const groupid = req.params.id;
    const studyLists = await getStudyList(groupid, token);
    // if (!studyLists) {
    //   return { error: 404 };
    // } else {
      return {
        groupid,
        studyLists,
        token
      };
    }
  

  constructor(props) {
    super(props);
    this.state = {
      adding: false
    };
    this.addAStudy = this.addAStudy.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.freshPage = this.freshPage.bind(this);
  }
  //checked
  async addAStudy() {
    const { name, description } = this.state;
    const { groupid, token } = this.props;
    if (validate(name, 255) && validate(description, 512 * 4)) {
      this.setState({ adding: true });
      const ok = await addStudy(name, description, groupid);
      this.setState({ adding: false });
      if (ok) {
        this.freshPage();
      }
    }
  }
  //checked
  async deleteGroup() {
    const { groupid } = this.props;
    const ok = await deleteUserGroup(groupid);
    if(ok) {
      Router.push("/usergroups");
    }
  }

  freshPage() {
    const url = window.location.href;
    window.location.href = url;
  }

  render(){
    
    const { studyLists, adding } = this.props;
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
      <h3 style={{color:"black"}}>
          &nbsp;&nbsp; List Of Studies 
      </h3>


      {adding && (
        <div style={{display: "flex", justifyContent: "center" }}>
          <ScaleLoader color="4A7443" />
        </div>
      )}
      {
        studyLists && studyLists.map((study, index) => (
          <Panel style={{float: "left", width:"32%", marginRight:"10px"}} key={index} bsStyle="success">
          <Panel.Heading>
            <Panel.Title componentClass="h3" >
              <Link href={`/study/${study.id}`}>
                    <a> {study.name} </a>
              </Link>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>{study.description}</Panel.Body>
          </Panel>
        ))
      }
      <Panel bsStyle="danger" style={{float:"left", overflow:"hidden", marginTop:"10px", width:"98%"}}>
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
            <Glyphicon style={{ float: "left", marginLeft:"15px", color:"#9D4A45", fontSize: "27px"}} glyph="plus" onClick={this.addAStudy} />
          </div>
        </Panel>
      </div>
    );
    
  }
  
}

export default withPage(Usergroup);