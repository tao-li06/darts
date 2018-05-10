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
    
    for (let step = 0; step < steps; step++) {
      cells.push(
        <g transform={`translate(0, ${cellH * (steps * 2 - step)})`}>
          <text x={cellW / 2} y = {cellH / 2} textAnchor="middle"  alignmentBaseline="central">{(min * (1 - step / steps)).toFixed(1)}</text>
          <rect transform={`translate(${cellW}, 0)`} width={cellW} height={cellH} fill={color(h2, l2, 1 - step / steps)} />
        </g>
      );
      cells.push(
        <g transform={`translate(0, ${cellH * (step)})`}>
          <text x={cellW / 2} y = {cellH / 2} textAnchor="middle"  alignmentBaseline="central">{(max * (1 - step / steps)).toFixed(1)}</text>
          <rect transform={`translate(${cellW}, 0)`} width={cellW} height={cellH} fill={color(h1, l1, 1- step / steps)} />
        </g>
      );
    }
    cells.push(
      <g transform={`translate(0, ${cellH * (steps)})`}>
        <text x={cellW / 2} y = {cellH / 2} textAnchor="middle"  alignmentBaseline="central">{0}</text>
        <rect transform={`translate(${cellW}, 0)`} width={cellW} height={cellH} fill={color(h2, l2, 0)} />
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
      <svg height={(steps * 2 + 1 ) * cellH} width={2 * cellW}>
        { this.getCells()}
      </svg>
    );
  }
}


Palette.defaultProps = {
  cellW: 40,
  cellH: 20,
}

export default Palette;