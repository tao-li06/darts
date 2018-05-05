import React, { Component } from 'react';
import { Button, Well } from 'react-bootstrap';
import { GridLoader } from 'react-spinners';
import style from './Viewer.scss';
import classnames from 'classnames';
import retrieve from '../../model/record';
import Chart from '../Chart';
import Palette from '../Palette';

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
    data: [],
  }

  openFile() {
    this.inputEle && this.inputEle.click();
  }

  async onFileLoaded(event) {
    this.setState({
      load: STATE_LOADING
    });
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    try {
      const data = await retrieve(files[0]);
      this.setState({
        data: [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
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
            <div className="view-pannel-container--unloaded">
              <Well>Open the CSV file.</Well>
              <div type="file" className="btn btn-primary" onClick={this.openFile}>
                <input type="file" style={{ display: "none" }} ref={(ele) => this.inputEle = ele} onChange={this.onFileLoaded} />
                LOAD
                            </div>
            </div>
          )
        }
        {
          load == STATE_LOADING && (
            <div className="view-pannel-container--unloaded">
              <GridLoader color="green" />
            </div>
          )
        }
        {
          load == STATE_LOADED && (
            <div className="view-pannel-container--unloaded">
              <Palette steps={8} start={[49,130,189]}/>
              <Chart data={data}/>
             </div>
          )
        }

      </div>
    );
  }
}

export default Viewer;
