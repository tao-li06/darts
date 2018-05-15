import React, { Component } from 'react';
import { Modal, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';
import retrieve from '../../model/record';
import { uploadExp } from '../../service/darts';
import { connect } from 'react-redux';

const STATE_NOT_LOADED = 0;
const STATE_LOADING = 1;
const STATE_LOADED = 2;

const defaultState = {
  load: STATE_NOT_LOADED,
  headerFormat: 'Abundance Ratio:[^0-9]*(\\d+)[^0-9]*(\\d+)[^0-9]*$',
  groupby: 'Master Protein Accessions',
  identifier: 'Positions in Master Proteins',
};

class UploadModal extends Component {
  constructor(props) {
    super(props);
    
    this.openFile = this.openFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onFileSelected = this.onFileSelected.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.state = defaultState;
  }

  onEnter() {
    this.setState(defaultState);
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

  async submit() {
    const { headerFormat, file, groupby, identifier, name } = this.state;
    
    if (!file || !name) {
      alert("Please enter a name and select a file!");
      return;
    }
    this.setState({
      load: STATE_LOADING
    });
    const { token } = this.props;
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    try {
      const data = await retrieve(file, new RegExp(headerFormat), groupby, identifier);
      const ok = await uploadExp(token, name, data.columns, data.items);
      if (ok) {
        this.setState({
          data,
          load: STATE_LOADED
        });
        this.props.onClose(true);
      } else {
        this.setState({
          load: STATE_NOT_LOADED
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        load: STATE_NOT_LOADED
      });
    }

  }


  render() {
    const { show } = this.props;
    const { load, fileName, name, headerFormat, groupby, identifier } = this.state;
    return  (
      <Modal show={show} onEnter={this.onEnter}>
        <style jsx global>{`.upload-modal {
          display: flex;
          flex-direction: column;

          
        }

        .form_group {
          width: 100%;
        }

.upload-modal__row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.upload-modal__text {
  font-size: 18px;
  padding-left: 8px;
  padding-right: 8px;
}`}</style>
        <Modal.Header>
          Upload CSV
        </Modal.Header>
        <Modal.Body className="upload-modal">
          <div className="upload-modal__row">
            <FormGroup
              controlId="formUsername"
            >
              <ControlLabel>Experiment Name</ControlLabel>
              <FormControl
                type="text"
                value={name}
                placeholder="Enter The Experiment Name."
                onChange={(e) => this.setState({ name: e.target.value})}
              />
            </FormGroup>
          </div>
          <div className="upload-modal__row">
            <FormGroup
              controlId="formUsername"
            >
              <ControlLabel>Data Columns (Regex)</ControlLabel>
              <FormControl
                type="text"
                value={headerFormat}
                onChange={(e) => this.setState({ headerFormat: e.target.value})}
              />
            </FormGroup>
          </div>
          <div className="upload-modal__row">
            <FormGroup
              controlId="formUsername"
            >
              <ControlLabel>Group By column</ControlLabel>
              <FormControl
                type="text"
                value={groupby}
                onChange={(e) => this.setState({ groupby: e.target.value})}
              />
            </FormGroup>
          </div>
          <div className="upload-modal__row">
            <FormGroup
              controlId="formUsername"
            >
              <ControlLabel>Column identifier</ControlLabel>
              <FormControl
                type="text"
                value={identifier}
                onChange={(e) => this.setState({ identifier: e.target.value})}
              />
            </FormGroup>
          </div>
          <div className="upload-modal__row">
            <div type="file" className="btn btn-primary" onClick={this.openFile}>
              <input type="file" style={{ display: "none" }} ref={(ele) => this.inputEle = ele} onChange={this.onFileSelected} />
                Select File
            </div>
            <div className="upload-modal__text">{fileName}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {
            load == STATE_NOT_LOADED && (
              <>
                <Button onClick={this.props.onClose}>Close</Button>
                <Button onClick={this.submit}>Upload</Button>
              </>
            )
          }
          {
            load == STATE_LOADING && <ScaleLoader color="green"/>
          }
        </Modal.Footer>
      </Modal>
    );
    
  }
}

export default connect(state => ({token: state.user.token}))(UploadModal);