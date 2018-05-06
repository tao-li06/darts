import React, { Component } from 'react';
import { color } from '../../model/palette';

class Chart extends Component {
  render() {
    const {
      cellW,
      cellH,
      data,
      indicatorColor:
        [hue, lightness],
      indicatorColor2: [h2, l2]
    } = this.props;
    const {
      max, min ,columns,items
    } = data;
    return (
      <svg width={cellW * items.length} height={cellH * columns.length}>
        {
          items.map((row, rowIndex) => {
            return row.map(([i, v]) => (
              <g transform={`translate(${cellW * rowIndex}, ${cellH * i})`}>
                <rect width={cellW} height={cellH} 
                  fill={v > 0 ? color(hue, lightness, v / max) : color(h2, l2, v / min)}/>
                {/* <text alignmentBaseline="central" text-anchor="middle"  style={{fill: "rgb(128, 62, 51)"}}>{v}</text> */}
              </g>
            ))
          })
        }
      </svg>
    );
  }
}

Chart.defaultProps = {
  cellW: 15,
  cellH: 60,
  indicatorColor: [240, 50],
  indicatorColor2: [0, 50],
}

export default Chart;