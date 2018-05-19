import React, { Component } from 'react';
import { color } from '../../model/palette';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class Chart extends Component {
  state = {
    selectedRow: -1,
    selectedColumn: -1
  }

  render() {
    const {
      headerWidth,
      maxNameCharLength,
      nameFontSize,
      cellW,
      cellH,
      normalize,
      max,
      min,
      data,// this.data (const keys = Object.keys(data) to )
      columns,
      color1: [h1, l1],
      color2: [h2, l2],
      style
    } = this.props;
    const nameHeight = maxNameCharLength * nameFontSize * 0.52;
    const keys = Object.keys(data);
    const len = keys.length;
    return (
      <div style={{display: "flex", overflow: "hidden", ...style}}>
        <svg width={headerWidth} height={cellH * columns.length + nameHeight}>
          <g transform={`translate(0, 0)`}>
            {
              columns.map((column, index) => (
                <text x={headerWidth / 2} y={ cellH * (index) + cellH / 2} textAnchor="middle"  alignmentBaseline="central">{column}</text>
              ))
            }
          </g>
        </svg>
        <div style={{overflowX: "auto"}}>
          <svg width={cellW * len} height={cellH * columns.length + nameHeight}>
            {
              keys.map((rowIndex, rowItemIndex) => {
                const row = data[rowIndex];
                return (
                  <g transform={`translate(${cellW * (rowItemIndex)}, 0)`} height={columns.length * cellH + nameHeight}>
                    {// v = row[i], row
                      Object.keys(row).map((i) => {
                        const v = row[i];
                        const value = normalize(v);
                        const percent = (value >= max || value <= min) ? 1 : (value > 0) ? value / max : value / min;
                        return (
                          <OverlayTrigger placement="top" overlay={<Tooltip id='tooltip'>{v}</Tooltip>}>
                            <g key={i} transform={`translate(0, ${cellH * (i)})`} >
                              <rect width={cellW} height={cellH}
                                fill={value > 0 ? color(h1, l1, percent) : color(h2, l2, percent)}/>
                              <text fill={Math.abs(value) > 0.6? "white":"black" } x={cellW / 2} y={cellH / 2} fontSize={10} textAnchor="middle" alignmentBaseline="central">{v.toFixed(1)}</text>
                            </g>
                          </OverlayTrigger>);
                        }
                      )
                    }
                    {
                      <OverlayTrigger placement="top" overlay={<Tooltip id='tooltip'>{rowIndex}</Tooltip>}>
                        <text fontSize={`${nameFontSize}px`} x={cellW / 2 - (nameFontSize / 2)} y = {cellH * columns.length} 
                          transform={`rotate(90 ${cellW / 2 - (nameFontSize / 2)}, ${cellH * columns.length})`}>{rowIndex > 
                          maxNameCharLength ? `${rowIndex.substring(0, maxNameCharLength - 3)}...` : rowIndex}
                        </text>
                      </OverlayTrigger>
                    }
                  </g>
                );
              })
            }
          </svg>
        </div>
      </div>
      
    );
  }
}

Chart.defaultProps = {
  headerWidth: 80,
  maxNameCharLength: 22,
  nameFontSize: 14,
  cellH: 30,
  cellW: 35,
  normalize: (v) => Math.log2,
  max: 2,
  min: -2,
  color1: [0, 50],
  color2: [240, 50],
}

export default Chart;