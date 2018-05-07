import React, { Component } from 'react';
import { color } from '../../model/palette';

class Palette extends Component {
  getCells() {
    const {
      cellW,
      cellH,
      steps,
      color1: [h1, l1],
      color2: [h2, l2],
      max,
      min
    } = this.props;
    const cells = [];
    
    for (let step = 0; step < steps - 1; step++) {
      cells.push(
        <g transform={`translate(${cellW * step}, 0)`}>
          <text x={cellW / 2} y = {cellH / 2} textAnchor="middle"  alignmentBaseline="central">{(min * (1 - step / steps)).toFixed(1)}</text>
          <rect transform={`translate(0, ${cellH})`} width={cellW} height={cellH} fill={color(h2, l2, 1 - step / steps)} />
        </g>
      );
      cells.push(
        <g transform={`translate(${cellW * (2 * steps - 2 - step)}, 0)`}>
          <text x={cellW / 2} y = {cellH / 2} textAnchor="middle"  alignmentBaseline="central">{(max * (1 - step / steps)).toFixed(1)}</text>
          <rect transform={`translate(0, ${cellH})`} width={cellW} height={cellH} fill={color(h1, l1, 1- step / steps)} />
        </g>
      );
    }
    cells.push(
      <g transform={`translate(${cellW * (steps - 1)}, 0)`}>
        <text x={cellW / 2} y = {cellH / 2} textAnchor="middle"  alignmentBaseline="central">{0}</text>
        <rect transform={`translate(0, ${cellH})`} width={cellW} height={cellH} fill={color(h2, l2, 0)} />
      </g>
    );
    return cells;
  }

  render() {
    const {
      cellW,
      cellH,
      steps,
      color1: [h1, l1],
      color2: [h2, l2],
      max,
      min
    } = this.props;
    return (
      <div style={{marginTop: "50px", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{marginBottom: "20px"}}>Color Meter (post normalization)</div>
        <svg height={2 * cellH} width={steps * (2 * cellW + 1)}>
          { this.getCells()}
        </svg>
      </div>
    );
  }
}


Palette.defaultProps = {
  cellW: 40,
  cellH: 20,
}

export default Palette;