import React, { Component } from 'react';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';
import { uploadStudy } from '../service/darts';
import UploadModal, { uploadModal } from '../components/Library/UploadModal';

class AddExperiment extends Component {
  constructor(props) {
    super(props);  // this.props = props;
    this.state = { state: 0, 
      show_upload_modal : false};
  }

  render() {
    const { state, description, experimentName, drugID, show_upload_modal} = this.state;
    const { id } = this.props;
    return (
      <>
           <UploadModal id={id} show={show_upload_modal} onClose={(async (uploaded) => {
          this.setState({show_upload_modal: false});
        }).bind(this)}/>
          <Button bsStyle="primary" onClick={() => this.setState({ show_upload_modal: true}) }> Add an Experiment </Button>
      </>
    )
  }
}

export default AddExperiment;