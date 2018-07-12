import React, { Component } from 'react';
import { Alert, Button, Label, Glyphicon, Table, FormGroup, FormControl} from 'react-bootstrap';
import { getStudyInfo, deleteExp, uploadExp, deleteStudy} from '../service/darts';
import withPage from './withPage';
import Link from 'next/link';
import cookies from 'next-cookies';
import { ScaleLoader } from 'react-spinners';
import retrieve, { sort } from '../model/record';
import Router from 'next/router';

const validate = (s, l) => s && s.length <= l;

class Study extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { asPath, req, res } = ctx;
    const groupid = req.params.groupId;
    const studyid = req.params.studyId;
    const studyInfo = await getStudyInfo(groupid, studyid, token);
      return {
        studyid,
        groupid,
        token,
        studyInfo
      };
  }
  

  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
      headerFormat: 'Abundance Ratio:[^0-9]*(\\d+)[^0-9]*(\\d+)[^0-9]*$',
      groupby: 'Master Protein Accessions',
      identifier: 'Positions in Master Proteins',
      modification: 'Modifications',
      showDeleteStudy: false
    }
    this.openFile = this.openFile.bind(this);
    this.onFileSelected = this.onFileSelected.bind(this);
    this.submit = this.submit.bind(this);
    this.trash = this.trash.bind(this);
    this.handleDeleteShow = this.handleDeleteShow.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.deleteAStudy = this.deleteAStudy.bind(this);
  }

  handleDismiss() {
    this.setState({ showDeleteStudy: false });
  }

  handleDeleteShow() {
    const {showDeleteStudy} = this.state;
    this.setState({ showDeleteStudy: !showDeleteStudy });
  }

  openFile() {
    this.inputEle && this.inputEle.click();
  }

  onFileSelected(event) {
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    this.setState({
      file: files[0],
      fileName: event.target.value
    });
  }

  async deleteItem(id, ProteinId) {
    const result = await deleteExp(id, ProteinId);
    if(result) {
      this.freshPage();
    } else {
      alert('Fail to delete.');
    }
  }

  async deleteAStudy() {
    const {groupid, studyid, token} = this.props;
    const result = await deleteStudy(groupid, studyid, token);
    if(result) {
      Router.push(`/usergroup/${groupid}`);
    } else {
      alert('Fail to delete the study.');
    }
  }

  async submit() {
    console.log();
    const { headerFormat, file, groupby, identifier, name, modification, label, description} = this.state;
    
    if (!file || !name) {
      alert("Please check your entries and select a file!");
      return;
    }
    this.setState({
      adding: true
    });
    const { studyid, groupid, token } = this.props;
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    try {
      const data = await retrieve(file, new RegExp(headerFormat), groupby, identifier, modification);
      const ok = await uploadExp(groupid, name, label, data.columns, description, data.items, studyid, token);
      if (ok) {
        this.setState({
          adding: false,
        });
        this.freshPage();
      } else {
        this.setState({
          adding: false
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        adding: false
      }); 
    }
  }

  async trash(groupid, studyid, expId, token) {
    const ok = deleteExp(groupid, studyid, expId, token);
    if(ok)
      this.freshPage();
  }

  freshPage() {
    const url = window.location.href;
    window.location.href = url;
  }

  render() {
    const { studyid, groupid, studyInfo, token  } = this.props;
    const { adding, showDeleteStudy } = this.state;
    const { fileName} = this.state;
    return(
    <div className="container">
      <style jsx global>{
        `
        .file__text {
          font-size: 18px;
          padding-left: 18px;
          font-weight: 300;
        }

        th {
          vertical-align: middle !important;
        }

        .form-group {
          margin-bottom: unset;
        }

        .paragraph-last {
          margin-top: 30px;
        }
        `
      }</style>
      <Button style={{color: "MidnightBlue", float:"right", marginRight:"10px" }} onClick={this.handleDeleteShow}>Delete Study &nbsp;
        <Glyphicon  glyph="trash"/>
      </Button> 
      <h3><Glyphicon style={{color: "Navy"}} glyph="folder-open"/>&nbsp;&nbsp;{studyInfo.name}</h3>
      <p className="lead">{studyInfo.description}</p>
      <p className="paragraph-last">List of Experiments in the Study</p>

      <div>
        { showDeleteStudy ?
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <h4>Confirm to delete</h4>
            <p>
              Only managers of the group can delete a study. The study and all of its content will be deleted permanently and cannot be retrieved. Please confirm to continue.
            </p>
            <p>
              <Button onClick ={ ()=> { this.deleteAStudy(); } }
                 bsStyle="danger">Delete</Button>
              <span> &nbsp; </span>
              <Button onClick={this.handleDismiss}>Cancel</Button>
            </p>
          </Alert>
          : null
        }
        </div>

      <Table hover condensed  striped responsive>
          <thead>
            <tr>
              <th style={{width: "1%"}}>#</th>
              <th style={{width: "15%"}}>Name</th>
              <th style={{width: "15%"}}>Label</th>
              <th style={{width: "30%"}}>Description</th>
              <th style={{width: "26%"}}></th>
              
            </tr>
          </thead>
          <tbody>
            {
              studyInfo.experiments && studyInfo.experiments.map((exp, index) => (
                <tr key={index}>
                  <th sm={1}>{exp.id}</th>
                  <th sm={2}>
                    <Link href={`/usergroup/${groupid}/study/${studyid}/experiment/${exp.id}`}>
                      <a> {exp.name} </a>
                    </Link>
                  </th>
                  <th sm={2}>
                  {
                    exp.label && exp.label.split(',').map((label, i) => <Label style={{marginRight:"5px"}} key={i}>{label}</Label>)
                  }
                  </th>
                  <th>
                    {exp.description}
                  </th>
                  <th>  
                    <Button style={{float:"right", marginRight:"50px"}}bsSize="large" bsStyle="link" onClick={()=> this.trash(groupid, studyid, exp.id, token)} >
                            <Glyphicon glyph="trash" style={{color:"#0E4D92"}}/>
                    </Button> 
                  </th>
                </tr>
              ))
            }
            {
                adding ? (
                  <tr>
                    <th style={{width: "80%"}}>
                      <div style={{display: "flex", justifyContent: "center"}}>
                        <ScaleLoader color="blue" />
                      </div>
                    </th> 
                  </tr>) : (

                  <tr>
                    <th sm={1}/>
                    <th sm={2} className="table__item">
                      <FormGroup validationState={validate(this.state.name, 255) ? "success" : "error" }>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Name"
                            onChange={(e) => this.setState({ name: e.target.value})}
                          />
                      </FormGroup>
                    </th>
                    <th  sm={2} className="table__item">
                      <FormGroup validationState={validate(this.state.label, 255) ? "success" : "error" }>
                      
                        <FormControl
                            type="text"
                            value={this.state.label}
                            placeholder="e.g. 2018-07-05, Mouse"
                            onChange={(e) => this.setState({ label: e.target.value})}
                          />
                        </FormGroup>
                    </th>
                    <th  sm={3} className="table__item">
                      <FormGroup validationState={validate(this.state.label, 255) ? "success" : "error" }>
                      
                        <FormControl
                            type="text"
                            value={this.state.description}
                            placeholder="Description, e.g. successful run"
                            onChange={(e) => this.setState({ description: e.target.value})}
                          />
                        </FormGroup>
                    </th>
                    <th sm={6} className="table__item">
                      <div style={{display: "flex", alignItems: "center"}}>
                        <div type="file" className="btn btn-primary" onClick={this.openFile}>
                          <input type="file" style={{ display: "none" }} ref={(ele) => this.inputEle = ele} onChange={this.onFileSelected} />
                            Select File
                        </div>
                        <div className="file__text">{fileName}</div>
                        <Button bsSize="large" bsStyle="link" onClick={this.submit} >
                          <Glyphicon glyph="plus" style={{color:"#0E4D92"}}/>
                        </Button>
                      </div>

                    </th>
                  </tr>)
              }
          </tbody>
      </Table>
    </div>
    )
  }
}

  export default withPage(Study);