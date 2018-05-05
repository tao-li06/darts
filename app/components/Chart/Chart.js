import React, { Component } from 'react';

class Chart extends Component {
  render() {
    const {
      cellW,
      cellH,
      data,
      meter
    } = this.props;
    return (
      <svg width={cellW * data.length} height={cellH * data[0].length}>
        {
          data.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => (
              <g transform={`translate(${cellW * rowIndex}, ${cellH * cellIndex})`}>
                <rect width={cellW} height={cellH} fill={meter.get(cell.value)}/>
                <text alignmentBaseline="central" text-anchor="middle"  style={{fill: "rgb(128, 62, 51)"}}>{cell.text}</text>
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
  meter:  {
    get: (v) => `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
  }
}

export default Chart;