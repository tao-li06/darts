import React, { Component } from 'react';
import { color } from '../../model/palette';
import { Overlay, Tooltip } from 'react-bootstrap';

class Chart extends Component {
  state = {
    selectedRow: -1,
    selectedColumn: -1
  }

  render() {
    const {
      nameW,
      cellW,
      cellH,
      normalize,
      max,
      min,
      data: { id, items },
      columns,
      color1: [h1, l1],
      color2: [h2, l2]
    } = this.props;
    return (
      <svg width={cellW * columns.length + nameW} height={cellH * (1 + items.length)}>
        {
          <g transform={`translate(0, 0)`}>
            {
              columns.map((column, index) => (
                <text x={nameW + cellW * index + cellW / 2} y={cellH / 2} textAnchor="middle"  alignmentBaseline="central">{column.substring(0, 24)}</text>
              ))
            }
          </g>
        }
        {
          items.map((row, rowIndex) => (
            <g transform={`translate(0, ${cellH * (rowIndex + 1)})`} height={cellH}>
              {
                <text x={nameW / 2} y = {cellH / 2 + 3} textAnchor="middle"  alignmentBaseline="central">{row.id}</text>
              }
              {
                row.items.map(([i, v]) => {
                  const value = normalize(v);
                  const percent = (value >= max || value <= min) ? 1 : (value > 0) ? value / max : value / min;
                  return (<g key={i} transform={`translate(${cellW * i + nameW}, 0)`} >
                      <rect width={cellW} height={cellH}
                        fill={value > 0 ? color(h1, l1, percent) : color(h2, l2, percent)}/>
                      <text x={cellW / 2} y={cellH / 2} fontSize={12} textAnchor="middle" alignmentBaseline="central">{v}</text>
                      
                    </g>);
                  }
                )
              }
            </g>
          ))
        }
      </svg>
    );
  }
}

Chart.defaultProps = {
  nameW: 150,
  cellW: 120,
  cellH: 30,
  normalize: (v) => Math.log2,
  max: 2,
  min: -2,
  color1: [0, 50],
  color2: [240, 50],
}

export default Chart;