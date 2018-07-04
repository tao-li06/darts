import React, { Component } from 'react';
import withPage from './withPage';
import { getStudyList, addStudy } from '../service/darts';

class Usergroup extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { asPath, req, res } = ctx;
    const id = req.params.id;
    const studyLists = await getStudyList(id, token);
    if (!studyLists) {
      return { error: 404 };
    } else {
      return {
        id,
        studyLists
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      adding: false
    }
  }

  async addStudy() {
    const { name, description} = this.state;
    const { id } = this.props; 
    if (validate(name, 255) && validate(label, 255) && validate(description, 512 * 4)) {
      this.setState({ adding: true });
      const ok = await addStudy(name, description, id);
      this.setState({ adding: false });
      if (ok) {
        this.freshPage();
      }
    }
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
        studyLists.map((study, index) => (
          <Panel key={index} bsStyle="info">
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
      <Panel bsStyle="success" style={{overflow:"hidden", marginTop:"20px"}}>
        <Panel.Heading >
          <Panel.Title componentClass="h3">Create a Study</Panel.Title>
        </Panel.Heading>
        <Panel.Body>A study is shared only within the group, and can be edited by group members.</Panel.Body>
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
          <Glyphicon style={{ float: "left", marginLeft:"15px", color:"#4A7443", fontSize: "27px"}} glyph="plus" onClick={this.addUserGroup} />
        </div>
      </Panel>
    </div>
  );
    
  }
  
}

export default withPage(Usergroup);