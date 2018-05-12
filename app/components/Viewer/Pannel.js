import React, { Component } from 'react';
import Chart from '../Chart';
import Palette from '../Palette';
import ReactCardFlip from 'react-card-flip';
import { Glyphicon, Button, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton, Label } from 'react-bootstrap';
import style from './Pannel.scss';
import ProteinTitle from './PanelTitle';

class Pannel extends Component {
  state= {
    selected: 0,  
    normalize: Math.log2,
    max: 2,
    min: -2,
    color1: [0, 50],
    color2: [240, 50],
    showDetails: false
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const { selected } = this.state;
    const { data: { orders } } = this.props
    if (e.keyCode == 37 && selected > 0) {
      this.setState({selected: selected - 1});
    } else if (e.keyCode == 39 && selected < orders.length - 1) {
      this.setState({selected: selected + 1});
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  render() {
    const { data, data: { orders, items, columns } } = this.props;
    const { showDetails, selected, normalize, max, min, color1, color1: [h1, l1], color2, color2: [h2, l2] } = this.state;
    return (
      <>
        <style jsx>{style}</style>
        <ReactCardFlip isFlipped={showDetails} style={{width: "1200px"}}>
          <div key="front" className="pannel" style={{height: "600px", width: "1200px", backgroundClip: "white"}}>
            <div style={{display: "flex", width: "100%"}}>
              <div style={{flex: "1", justifyContent: "center", display: "flex"}}>
              <Button bsSize="large" bsStyle="link" disabled={!data} onClick={() => this.setState({showDetails: true})}><Glyphicon glyph="th"/></Button>
              </div>
            </div>
          </div>
          <div className="pannel" style={{height: "600px", width: "1200px", display: "flex", flexDirection: "column", backgroundClip: "white"}} key="back">
            <div style={{display: "flex", width: "100%"}}>
              <Button bsSize="large" bsStyle="link" disabled={selected == 0 } onClick={() => this.setState({selected: selected - 1})}><Glyphicon glyph="chevron-left"></Glyphicon></Button>
              <div style={{flex: "1", justifyContent: "center", display: "flex"}}>
              <Button bsSize="large" bsStyle="link" disabled={!data} onClick={() => this.setState({showDetails: false})}><Glyphicon glyph="th-list"/></Button>
              </div>
              <Button bsSize="large" bsStyle="link" disabled={selected >= orders.length - 1} onClick={() => this.setState({selected: selected + 1})}><Glyphicon glyph="chevron-right"/></Button>
            </div>
            <div style={{padding: "0px", display: "flex", flexDirection: "column", alignItems: "flex-start", flex: "1"}}>
              <h1 className="pannel__title">{orders[selected]}</h1>
              <div style={{display: "flex", flexDirection: "row", width: "80vw"}}>
                <Palette color1={color1} color2={color2} steps={5} max={max} min={min}/>
                <Chart style={{width: "calc(100% - 160px)"}} data={items[orders[selected]]} columns={columns} normalize={normalize} max={max} min={min} color1={color1} color2={color2}/>
              </div>
            </div>
            
          </div>
        </ReactCardFlip>
      </>
      );
   }
}

export default Pannel;