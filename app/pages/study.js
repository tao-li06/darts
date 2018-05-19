import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Label, PageHeader, Badge, Glyphicon, Table, 
  ControlLabel, FormGroup, FormControl, Form, Col } from 'react-bootstrap';
import { getStudy, deleteExp, uploadExp} from '../service/darts';
import { connect } from 'react-redux';
import withPage from './withPage';
import Router from 'next/router';
import cookies from 'next-cookies';
import Chart from '../components/Chart';
import Palette from '../components/Palette';
import { ScaleLoader } from 'react-spinners';
import retrieve, { sort } from '../model/record';
import Exp from '../components/Exp';

const validate = (s, l) => s && s.length <= l;


class Study extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { asPath, req } = ctx;
    const id = req.params.id;
    const data = await getStudy(id, token);
    data.experiments && data.experiments.forEach(exp => {
      exp.orders = sort(exp.data);
    });
    return {
      id,
      data
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: {},
      selected: {},
      show_uploadModal: false,
      headerFormat: 'Abundance Ratio:[^0-9]*(\\d+)[^0-9]*(\\d+)[^0-9]*$',
      groupby: 'Master Protein Accessions',
      identifier: 'Positions in Master Proteins',
      modification: 'Modifications',
    }
    this.openFile = this.openFile.bind(this);
    this.onFileSelected = this.onFileSelected.bind(this);
    this.submit = this.submit.bind(this);
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
      //await this.fetchList();
    } else {
      alert('Fail to delete.');
    }
  }

  async submit() {
    const { headerFormat, file, groupby, identifier, name, modification, label} = this.state;
    
    if (!file || !name) {
      alert("Please check your entries and select a file!");
      return;
    }
    this.setState({
      adding: true
    });
    const { id } = this.props;
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    try {
      const data = await retrieve(file, new RegExp(headerFormat), groupby, identifier, modification);
      const ok = await uploadExp(id, name, label, data.columns, data.items);
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

  freshPage() {
    const url = window.location.href;
    window.location.href = url;
  }

  render() {
    const { data, id } = this.props;
    const { adding, expanded } = this.state;
    const { fileName, name, headerFormat, groupby, identifier, modification} = this.state;
    
    return(
    <div className="container">
      <style jsx global>{
        `
        .table__item {
          vertical-align: top;
          padding: 10px;
        }
        `
      }</style>
      <h3><Glyphicon glyph="object-align-bottom"/>&nbsp;&nbsp;{data.name}</h3>
      <p className="lead">{data.description}</p>
      <h4><Label bsStyle="success">{data.label}</Label></h4>
      <Table hover condensed  striped responsive>
          <thead>
            <tr>
              <th>
                <Col sm={1}>#</Col>
                <Col sm={2}>Name</Col>
                <Col sm={2}>Label</Col>
                <Col sm={6}></Col>
                <Col sm={1}></Col>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.experiments.map((exp) => (
                expanded[exp.id] ? (
                  <tr>
                    <th>
                      <div>
                        <Col sm={1}>{exp.id}</Col>
                        <Col sm={2}>{exp.name}</Col>
                        <Col sm={2}>{exp.label}</Col>
                        <Col sm={6}>
                          <Button bsSize="large" bsStyle="link" onClick={() => this.setState({ expanded: {...expanded, [exp.id]: false}})}>
                            <Glyphicon glyph="equalizer"/>
                          </Button>
                        </Col>
                        <Col sm={1}>
                          <Button bsSize="large" bsStyle="link" onClick={async (e) => {e.stopPropagation();
                            await this.deleteItem(id, exp.id)}} >
                            <Glyphicon glyph="trash" style={{color:"#0E4D92"}}/>
                          </Button>
                        </Col>
                      </div>
                      <Exp items={exp.data} columns={exp.headers} orders={exp.orders}/>
                    </th>
                  </tr>
                ) : (
                
                <tr>
                  <th>
                    <Col sm={1}>{exp.id}</Col>
                    <Col sm={2}>{exp.name}</Col>
                    <Col sm={2}>{exp.label}</Col>
                    <Col sm={6}>
                      <Button bsSize="large" bsStyle="link" onClick={() => this.setState({ expanded: {...expanded, [exp.id]: true} })}>
                        <Glyphicon glyph="equalizer"/>
                      </Button>
                    </Col>
                    <Col sm={1}>
                      <Button bsSize="large" bsStyle="link" onClick={async (e) => {e.stopPropagation();
                        await this.deleteItem(id, exp.id)}} >
                        <Glyphicon glyph="trash" style={{color:"#0E4D92"}}/>
                      </Button>
                    </Col>
                  </th>
                </tr>)
              ))
            }
            {
                adding ? 
                  <th style={{width: "100%"}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <ScaleLoader color="blue" />
                    </div>
                  </th> :
                  <th>
                    <Col sm={1}></Col>
                    <Col sm={2} className="table__item">
                      <FormGroup validationState={validate(this.state.name, 255) ? "success" : "error" }>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Enter Name"
                            onChange={(e) => this.setState({ name: e.target.value})}
                          />
                      </FormGroup>
                    </Col>
                    <Col  sm={2} className="table__item">
                      <FormGroup validationState={validate(this.state.label, 255) ? "success" : "error" }>
                      
                        <FormControl
                            type="text"
                            value={this.state.label}
                            placeholder="Enter Label"
                            onChange={(e) => this.setState({ label: e.target.value})}
                          />
                        </FormGroup>
                    </Col>
                    <Col sm={6} className="table__item">
                      <Form horizontal>
                        <FormGroup>
                          <Col sm={4}>CSV File</Col>
                          <Col sm={8}>
                            <div style={{display: "flex"}}>
                              <div type="file" className="btn btn-primary" onClick={this.openFile}>
                                <input type="file" style={{ display: "none" }} ref={(ele) => this.inputEle = ele} onChange={this.onFileSelected} />
                                  Select File
                              </div>
                              <div className="upload-modal__text">{fileName}</div>
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup
                          controlId="formUsername"
                        >
                          <Col sm={4}>Data Columns (Regex)</Col>
                          <Col sm={8}>
                            <FormControl
                              type="text"
                              value={headerFormat}
                              onChange={(e) => this.setState({ headerFormat: e.target.value})}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="formUsername"
                          >
                            <Col sm={4}>Protein Name Column Name</Col>
                            <Col sm={8}>
                              <FormControl
                                type="text"
                                value={groupby}
                                onChange={(e) => this.setState({ groupby: e.target.value})}
                              />
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="formUsername"
                          >
                            <Col  sm={4}>Subseq Name Column Name</Col>
                            <Col  sm={8}>
                              <FormControl
                                type="text"
                                value={identifier}
                                onChange={(e) => this.setState({ identifier: e.target.value})}
                              />
                            </Col>
                        </FormGroup>
                        <FormGroup
                            controlId="formUsername"
                          >
                            <Col  sm={4}>Modification Column Name</Col>
                            <Col  sm={8}>
                              <FormControl
                                type="text"
                                value={modification}
                                onChange={(e) => this.setState({ modification: e.target.value})}
                              />
                            </Col>
                        </FormGroup>
                      </Form>
                    </Col>
                    <Col  sm={1} className="table__item">
                      <Button bsStyle="link" onClick={this.submit} >
                        <Glyphicon glyph="plus" style={{color:"#0E4D92"}}/>
                      </Button>
                    </Col>
                  </th>
              }
          </tbody>
      </Table>
      
      
    </div>
    )
  }
}

  export default withPage(Study);