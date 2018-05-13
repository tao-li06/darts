import React, { Component } from 'react';
import { Button, Well } from 'react-bootstrap';
import { GridLoader } from 'react-spinners';
import style from './Viewer.scss';
import classnames from 'classnames';
import retrieve from '../../model/record';
import Chart from '../Chart';
import Palette from '../Palette';
import Pannel from './Pannel';
import ReactCardFlip from 'react-card-flip';
import ExpReportCard from '../ExpReportCard';

const STATE_NOT_LOADED = 0;
const STATE_LOADING = 1;
const STATE_LOADED = 2;

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.openFile = this.openFile.bind(this);
    this.onFileLoaded = this.onFileLoaded.bind(this);
  }

  state = {
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
  }

  openFile() {
    this.inputEle && this.inputEle.click();
  }

  async onFileLoaded(event) {
    this.setState({
      load: STATE_LOADING
    });
    const { columns, groupby, identifier, chartColumns } = this.state;
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    try {
      const data = await retrieve(files[0], columns, groupby, identifier);
      data.columns = chartColumns;
      this.setState({
        data,
        load: STATE_LOADED
      });
    } catch (e) {
      this.setState({
        load: STATE_NOT_LOADED
      });
    }

  }

  render() {
    const { load, data } = this.state;
    return (
      <div className="container view-pannel">
        <style jsx>{style}</style>
        {
          load == STATE_NOT_LOADED && (
            <div style={{height: "600px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <h4>Open the CSV file.</h4>
              <div type="file" className="btn btn-primary" onClick={this.openFile}>
                <input type="file" style={{ display: "none" }} ref={(ele) => this.inputEle = ele} onChange={this.onFileLoaded} />
                LOAD
              </div>
            </div>
          )
        }
        {
          load == STATE_LOADING && (
            <div style={{height: "600px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            
              <GridLoader color="green" />
            </div>
          )
        }
        {
          load == STATE_LOADED && (
            <ExpReportCard data={data}/>
          )
        }

      </div>
    );
  }
}

export default Viewer;
