import React, { Component } from 'react';
import { Modal, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';
import retrieve from '../../model/record';
import style from './UploadModal.scss';
import { uploadExp } from '../../service/darts';
import { connect } from 'react-redux';

const STATE_NOT_LOADED = 0;
const STATE_LOADING = 1;
const STATE_LOADED = 2;

class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: STATE_NOT_LOADED,
      columns: [
        'Abundance Ratio: (Sample, 8) / (Control, 8)',
        'Abundance Ratio: (Sample, 7) / (Control, 7)',
        'Abundance Ratio: (Sample, 6) / (Control, 6)',
        'Abundance Ratio: (Sample, 5) / (Control, 5)',
        'Abundance Ratio: (Sample, 4) / (Control, 4)',
        'Abundance Ratio: (Sample, 3) / (Control, 3)',
        'Abundance Ratio: (Sample, 2) / (Control, 2)',
        'Abundance Ratio: (Sample, 1) / (Control, 1)'
      ],
      chartColumns: [
        '(S8) / (C8)',
        '(S7) / (C7)',
        '(S6) / (C6)',
        '(S5) / (C5)',
        '(S4) / (C4)',
        '(S3) / (C3)',
        '(S2) / (C2)',
        '(S1) / (C1)'
      ],
      groupby: 'Master Protein Accessions',
      identifier: 'Positions in Master Proteins',
    };
    this.openFile = this.openFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onFileSelected = this.onFileSelected.bind(this);
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
    this.setState({
      load: STATE_LOADING
    });
    const { columns, file, groupby, identifier, chartColumns, name } = this.state;
    const { token } = this.props;
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    try {
      const data = await retrieve(file, columns, groupby, identifier);
      data.columns = chartColumns;
      const ok = await uploadExp(token, name, chartColumns, data.items);
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
    const { load, fileName, name } = this.state;
    return  (
      <Modal show={show}>
        <style jsx global>{style}</style>
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