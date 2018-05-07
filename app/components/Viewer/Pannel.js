import React, { Component } from 'react';
import Chart from '../Chart';
import Palette from '../Palette';
import { Glyphicon, Button, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton, Label } from 'react-bootstrap';
import style from './Pannel.scss';

class Pannel extends Component {
  state= {
    selected: 0,  
    normalize: Math.log2,
    max: 2,
    min: -2,
    color1: [0, 50],
    color2: [240, 50],
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const { selected } = this.state;
    const { data: { items } } = this.props
    if (e.keyCode == 37 && selected > 0) {
      this.setState({selected: selected - 1});
    } else if (e.keyCode == 39 && selected < items.length - 1) {
      this.setState({selected: selected + 1});
    }
  }

  render() {
    const { data } = this.props;
    const { selected, normalize, max, min, color1, color1: [h1, l1], color2, color2: [h2, l2] } = this.state;
    return (
      <div className="pannel" onKeyDown={this.onKeyDown}>
        <style jsx>{style}</style>
        <ButtonToolbar style={{display: "flex", alignItems: "center"}}>
          <h4>Narmalization:</h4>
          <ToggleButtonGroup type="radio" defaultValue={1} name="normalization">
            <ToggleButton value={1} onClick={() => this.setState({normalize: Math.log2})}>lg2</ToggleButton>
            <ToggleButton value={2} onClick={() => this.setState({normalize: Math.log10})}>lg10</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <div className="pannel__content">
          <Button bsSize="large" disabled={selected == 0 } onClick={() => this.setState({selected: selected - 1})}><Glyphicon glyph="chevron-left"></Glyphicon></Button>
          <div style={{padding: "15px"}}>
            <h1 className="pannel__title">{data.items[selected].group}</h1>
            <Chart data={data.items[selected]} columns={data.columns} normalize={normalize} max={max} min={min} color1={color1} color2={color2}/>
            <Palette color1={color1} color2={color2} steps={10} max={max} min={min}/>
          </div>
          <Button bsSize="large" disabled={selected >= data.items.length - 1} onClick={() => this.setState({selected: selected + 1})}><Glyphicon glyph="chevron-right"/></Button>
        </div>
      </div>);
   }
}

export default Pannel;