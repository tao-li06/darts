import React, { Component } from 'react';
import { Button, Label, Glyphicon, Table, FormGroup, FormControl} from 'react-bootstrap';
import { getStudy, deleteExp, uploadExp} from '../service/darts';
import withPage from './withPage';
import Link from 'next/link';
import cookies from 'next-cookies';
import { ScaleLoader } from 'react-spinners';
import retrieve, { sort } from '../model/record';

const validate = (s, l) => s && s.length <= l;


class Study extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { asPath, req, res } = ctx;
    const id = req.params.id;
    const data = await getStudy(id, token);
    if (!data) {
      return { error: 404 };
    } else {
      return {
        id,
        data
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
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
      this.freshPage();
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
    const { adding, showSettings } = this.state;
    const { fileName, name, headerFormat, groupby, identifier, modification} = this.state;
    
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
      <h3><Glyphicon style={{color: "Turquoise"}} glyph="folder-open"/>&nbsp;&nbsp;{data.name}</h3>
      <p className="lead">{data.description}</p>
      <h4><Label bsStyle="success">{data.label}</Label></h4>
      <p className="paragraph-last">List of Experiments in the Study</p>
      <Table hover condensed  striped responsive>
          <thead>
            <tr>
              <th style={{width: "5%"}}>#</th>
              <th style={{width: "20%"}}>Name</th>
              <th style={{width: "25%"}}>Label</th>
              <th style={{width: "45%"}}>Notes</th>
              <th style={{width: "5%"}}></th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.experiments.map((exp, index) => (
                <tr key={index}>
                  <th sm={1}>{exp.id}</th>
                  <th sm={2}>
                    <Link href={`/studies/${id}/experiments/${exp.id}`}>
                      <a> {exp.name} </a>
                    </Link>
                  </th>
                  <th sm={2}>
                  {
                    exp.label && exp.label.split(',').map((label, i) => <Label key={i}>{label}</Label>)
                  }
                  </th>
                  <th sm={6}>{exp.notes}</th>
                  <th sm={1}>
                    <Button bsSize="large" bsStyle="link" onClick={async (e) => {e.stopPropagation();
                      await this.deleteItem(id, exp.id)}} >
                      <Glyphicon glyph="trash" style={{color:"#0E4D92"}}/>
                    </Button>
                  </th>   
                </tr>
              ))
            }
            {
                adding ? (
                  <tr>
                    <th style={{width: "100%"}}>
                      <div style={{display: "flex", justifyContent: "center"}}>
                        <ScaleLoader color="blue" />
                      </div>
                    </th> 
                  </tr>) : (
                  <tr>
                    <th sm={1}></th>
                    <th sm={2} className="table__item">
                      <FormGroup validationState={validate(this.state.name, 255) ? "success" : "error" }>
                        <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Enter Name"
                            onChange={(e) => this.setState({ name: e.target.value})}
                          />
                      </FormGroup>
                    </th>
                    <th  sm={2} className="table__item">
                      <FormGroup validationState={validate(this.state.label, 255) ? "success" : "error" }>
                      
                        <FormControl
                            type="text"
                            value={this.state.label}
                            placeholder="Enter Label (Splitted by comma)"
                            onChange={(e) => this.setState({ label: e.target.value})}
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
                      </div>
                    </th>
                    <th>
                      <Button bsSize="large" bsStyle="link" onClick={this.submit} >
                        <Glyphicon glyph="plus" style={{color:"#0E4D92"}}/>
                      </Button>
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