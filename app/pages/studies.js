import React, { Component } from 'react';
import { Navbar, Glyphicon, Nav, NavItem, ListGroup, 
  ListGroupItem, Breadcrumb, Button, Table, Label, FormControl, FormGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudyList, addStudy, deleteStudy} from '../service/darts';
import Router from 'next/router'
import UploadModal from '../components/Library/UploadModal';
import withPage from './withPage';
import { ScaleLoader} from 'react-spinners';
import AddStudy from '../components/AddStudy';
import cookies from 'next-cookies';
import Link from 'next/link';

//Home Page for client, provide a list of drug names in the ListGroup;

const validate = (s, l) => s && s.length <= l;

class Studies extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { res } = ctx;
    const data = await getStudyList(token);
    if (!data) {
      return { error: 404 };
    } else {
      return {
        data
      };
    }
  }
  
  constructor(props) {
    super(props);
    //this.fetchStudies = this.fetchStudies.bind(this);
    this.addStudy = this.addStudy.bind(this);
    this.state = { adding: false };
  }

  async addStudy() {
    const { name, label, description } = this.state;
    if (validate(name, 255) && validate(label, 255) && validate(description, 512 * 4)) {
      this.setState({ adding: true });
      const ok = await addStudy(name, description, label);
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

  // async fetchStudies() {
  //   const { token } = this.props;
  //   this.setState({ list_loaded: false});
  //   const data = await getStudyList(token);
  //   this.setState({data1: data, list_loaded: true});
  // }

  async deleteAStudy(id) {
    const result = await deleteStudy(id);
    if(result) {
      const url = window.location.href;
      window.location.href = url;
    } else {
      alert('Fail to delete.');
    }
  }
  
  render(){
    const { adding } = this.state;
    const { data } = this.props;
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
        <h3><Glyphicon style={{color: "Turquoise"}} glyph="th-list"/>
           &nbsp;&nbsp; List of Studies.
        </h3>

        {/* <AddStudy onAdded={async () => await this.fetchStudies()} /> */}
        <Table hover condensed  striped responsive>
          <thead>
            <tr>
              <th style={{width: "5%"}}>#</th>
              <th style={{width: "20%"}}>Name</th>
              <th style={{width: "10%"}}>Label</th>
              <th style={{width: "60%"}}>Description</th>
              <th style={{width: "5%"}}></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((study, index) => (
                <tr key={index}>
                  <th>{study.id}</th>
                  <th>
                    <Link href={`/studies/${study.id}`}>
                      <a> {study.name} </a>
                    </Link>
                  </th>
                  <th>
                    {
                      study.label && study.label.split(',').map((label, i) => <Label key={i}>{label}</Label>)
                    }
                  </th>
                  <th>{study.description}</th>
                  <th>
                    <Button bsStyle="link" onClick={async (e) => {e.stopPropagation();
                      await this.deleteAStudy(study.id)}} >
                      <Glyphicon glyph="trash" style={{color:"#0E4D92"}}/>
                    </Button>
                  </th>
                </tr>
              ))
            }
            <tr>
              {
                adding ? 
                  <th colSpan={5} style={{width: "100%"}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <ScaleLoader color="blue" />
                    </div>
                  </th> :
                  <>
                    <th></th>
                    <th>
                      <FormGroup validationState={validate(this.state.name, 255) ? "success" : "error" }>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Enter Name"
                            onChange={(e) => this.setState({ name: e.target.value})}
                          />
                      </FormGroup>
                    </th>
                    <th>
                      <FormGroup validationState={validate(this.state.label, 255) ? "success" : "error" }>
                      
                        <FormControl
                            type="text"
                            value={this.state.label}
                            placeholder="Enter Label"
                            onChange={(e) => this.setState({ label: e.target.value})}
                          />
                        </FormGroup>
                    </th>
                    <th>
                      <FormGroup validationState={validate(this.state.description, 512 * 4) ? "success" : "error" }>
                      
                        <FormControl
                          type="text"
                          value={this.state.description}
                          placeholder="Enter Description"
                          onChange={(e) => this.setState({ description: e.target.value})}
                        />
                      </FormGroup>
                    </th>
                    <th>
                      <Button bsStyle="link" onClick={this.addStudy} >
                        <Glyphicon glyph="plus" style={{color:"#0E4D92"}}/>
                      </Button>
                    </th>
                  </>
              }
            </tr>
          </tbody>
        </Table>  
        
      </div>
    );
  }
}

export default withPage(Studies);