import React, { Component } from 'react';
import { scale } from '../../model/palette';

class Palette extends Component {
  getCells() {
    const {
      cellW,
      cellH,
      horizontal,
      steps
    } = this.props;
    const cells = [];
    for (let step = 0; step < steps; step++) {
      cells.push(
        <rect width={cellW} height={cellH} fill={scale(211, 30, steps, step)} 
            transform={`translate(${cellW * (horizontal ? step : 0)}, ${cellH * (!horizontal ? step : 0)})`} />
      )
    }
    return cells;
  }

  render() {
    const {
      cellW,
      cellH,
      horizontal,
      steps,
      start,
      end
    } = this.props;
    return (
      <svg width={cellW * (horizontal ? steps : 1)} height= {cellH * (horizontal ? 1 : steps)}>
        {
          this.getCells()
        }
      </svg>
    );
  }
}

Palette.defaultProps = {
  cellW: 30,
  cellH: 20,
  horizontal: true,
  end: [ 255, 255, 255]
}

export default Palette;