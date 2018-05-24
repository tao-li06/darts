import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class FileFormatSetting extends Component {
  state = {
    headerFormat: 'Abundance Ratio:[^0-9]*(\\d+)[^0-9]*(\\d+)[^0-9]*$',
    groupby: 'Master Protein Accessions',
    identifier: 'Positions in Master Proteins',
    modification: 'Modifications',
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>CSV File Format</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
            <FormGroup
              controlId="formUsername"
            >
              <th sm={4}>Data thumns (Regex)</th>
              <th sm={8}>
                <FormControl
                  type="text"
                  value={headerFormat}
                  onChange={(e) => this.setState({ headerFormat: e.target.value})}
                />
              </th>
            </FormGroup>
            <FormGroup
                controlId="formUsername"
              >
                <th sm={4}>Protein Name thumn Name</th>
                <th sm={8}>
                  <FormControl
                    type="text"
                    value={groupby}
                    onChange={(e) => this.setState({ groupby: e.target.value})}
                  />
                </th>
            </FormGroup>
            <FormGroup
                controlId="formUsername"
              >
                <th  sm={4}>Subseq Name thumn Name</th>
                <th  sm={8}>
                  <FormControl
                    type="text"
                    value={identifier}
                    onChange={(e) => this.setState({ identifier: e.target.value})}
                  />
                </th>
            </FormGroup>
            <FormGroup
                controlId="formUsername"
              >
                <th  sm={4}>Modification thumn Name</th>
                <th  sm={8}>
                  <FormControl
                    type="text"
                    value={modification}
                    onChange={(e) => this.setState({ modification: e.target.value})}
                  />
                </th>
            </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.onClose()}>Close</Button>
            <Button onClick={() => this.onClose(this.state)} bsStyle="primary">Save</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

FileFormatSetting.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default FileFormatSetting;