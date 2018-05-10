import React, { Component } from 'react';
import { color } from '../../model/palette';
import { Overlay, Tooltip } from 'react-bootstrap';

class Chart extends Component {
  state = {
    selectedRow: -1,
    selectedColumn: -1
  }

  renderOld() {
    const {
      headerWidth,
      cellW,
      cellH,
      normalize,
      max,
      min,
      data: { id, data }, // data = [{ id: 'PN231', data: [[0, 1.2], [1, 2.3], [5, 7]]}, ...]
      columns,  // ['(s1) / (c1)', ...]
      color1: [h1, l1],
      color2: [h2, l2]
    } = this.props;
    return (
      <svg width={cellW * columns.length + headerWidth} height={cellH * (1 + data.length)}>
        {
          <g transform={`translate(0, 0)`}>
            {
              columns.map((column, index) => (
                <text x={headerWidth + cellW * index + cellW / 2} y={cellH / 2} textAnchor="middle"  alignmentBaseline="central">{column.substring(0, 24)}</text>
              ))
            }
          </g>
        }
        {
          data.map((row, rowIndex) => (
            <g transform={`translate(0, ${cellH * (rowIndex + 1)})`} height={cellH}>
              {
                <text x={headerWidth / 2} y = {cellH / 2 + 3} textAnchor="middle"  alignmentBaseline="central">{row.id}</text>
              }
              {
                row.data.map(([i, v]) => {
                  const value = normalize(v);
                  const percent = (value >= max || value <= min) ? 1 : (value > 0) ? value / max : value / min;
                  return (<g key={i} transform={`translate(${cellW * i + headerWidth}, 0)`} >
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

  render() {
    const {
      headerWidth,
      nameFontSize,
      cellW,
      cellH,
      normalize,
      max,
      min,
      data,
      columns,
      color1: [h1, l1],
      color2: [h2, l2],
      style
    } = this.props;
    let nameHeight = 0;
    for(let i = 0; i < data.length; i++) {
      nameHeight = Math.max(nameHeight, data[i].id.length * nameFontSize * 0.52);
    }
    return (
      <div style={{display: "flex", ...style}}>
        <svg width={headerWidth} height={cellH * columns.length + nameHeight}>
          <g transform={`translate(0, 0)`}>
            {
              columns.map((column, index) => (
                <text x={headerWidth / 2} y={ cellH * (index) + cellH / 2} textAnchor="middle"  alignmentBaseline="central">{column}</text>
              ))
            }
          </g>
        </svg>
        <div style={{flex: "1", overflowX: "auto"}}>
          <svg width={cellW * data.length} height={cellH * columns.length + nameHeight}>
            {
              data.map((row, rowIndex) => (
                <g transform={`translate(${cellW * (rowIndex)}, 0)`} height={columns.length * cellH + nameHeight}>
                  
                  {
                    row.items.map(([i, v]) => {
                      const value = normalize(v);
                      const percent = (value >= max || value <= min) ? 1 : (value > 0) ? value / max : value / min;
                      return (<g key={i} transform={`translate(0, ${cellH * (i)})`} >
                          <rect width={cellW} height={cellH}
                            fill={value > 0 ? color(h1, l1, percent) : color(h2, l2, percent)}/>
                          <text x={cellW / 2} y={cellH / 2} fontSize={12} textAnchor="middle" alignmentBaseline="central">{v}</text>
                          
                        </g>);
                      }
                    )
                  }
                  {
                    <text fontSize={`${nameFontSize}px`} x={cellW / 2 - (nameFontSize / 2)} y = {cellH * columns.length}  transform={`rotate(90 ${cellW / 2 - (nameFontSize / 2)}, ${cellH * columns.length})`}>{row.id}</text>
                  }
                </g>
              ))
            }
          </svg>
        </div>
      </div>
      
    );
  }
}

Chart.defaultProps = {
  headerWidth: 150,
  nameHeight: 600,
  nameFontSize: 14,
  cellH: 30,
  cellW: 60,
  normalize: (v) => Math.log2,
  max: 2,
  min: -2,
  color1: [0, 50],
  color2: [240, 50],
}

export default Chart;