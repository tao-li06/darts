import React, { Component } from 'react';
import { color } from '../../model/palette';
import { OverlayTrigger, Tooltip, FormGroup, Button, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import print from '../../model/svg';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: -1,
      selectedColumn: -1,
    }
    this.sortKeys = this.sortKeys.bind(this);
    // this.export = this.export.bind(this);
  }

  componentWillMount() {this.sortKeys(this.props);}

  componentWillReceiveProps(props) {this.sortKeys(props);
    // if (window === undefined) return;
  }

  // componentDidMount() {
  //   if (window === undefined) return;
  //   this.export(this.props);
  // }

  sortKeys(props){
    const {data} = props;
    const Rawkeys = Object.keys(data);
    if(Rawkeys) {
      var keys = Rawkeys.sort(
        function(a,b) {
          var regExp = /\[(\d{1,4})-(\d{1,4})\]\ \[(.*)\]/;
          var strA = regExp.exec(a);
          var strB = regExp.exec(b);
          if(strA[1].length === strB[1].length) {
            var sA = parseInt(strA[1]) * 100000 + parseInt(strA[2]) * 100 + strA[3].length;
            var sB = parseInt(strB[1]) * 100000 + parseInt(strB[2]) * 100 + strB[3].length;

            return ( sA === sB) ? 0  : (sA < sB )?  -1 : 1;   
          } else return strA[1].length < strB[1].length ? -1 : 1;
          
        }
      );
      this.setState({keys:keys});
    }
  }

  // export(props) {
  //   const { data, columns } = props;
  //   const s = print(data, columns);
  //   console.log(s);
  // }


  render() {
    const {
      headerWidth,
      maxNameCharLength,
      
      expcellH,
      normalize,
      max,
      min,
      data,// this.data (const keys = Object.keys(data) to )
      columns,
      color1: [h1, l1],
      color2: [h2, l2],
      style,
      expcellW, 
      expcellFontSize
    } = this.props;
    const cellW = expcellW != undefined ?  expcellW : 32;
    
    const cellH = expcellH != undefined ? expcellH : 25;
    const cellFontSize = expcellFontSize ? expcellFontSize : 10;
    const nameFontSize = cellFontSize + 3;
    const nameHeight = maxNameCharLength * nameFontSize * 0.52;
    const {keys} = this.state;
    const len = keys.length;
    return (
      <div style={{display: "flex", overflow: "hidden", ...style}}>
        <svg width={headerWidth} height={cellH * columns.length + nameHeight}>
          <g transform={`translate(0, 0)`}>
            {
              columns.map((column, index) => (
                <text key={index} x={headerWidth / 2} y={ cellH * (index) + cellH / 2} textAnchor="left"  alignmentBaseline="central">{column}</text>
              ))
            }
          </g>
        </svg>

        <div style={{overflow: "auto", width: "calc(100% - 80px)", height:"720px", marginLeft:"5px"}}>
          <svg width={cellW * len} height="600px">
            {
              keys.map((rowIndex, rowItemIndex) => {
                const row = data[rowIndex];
                return (
                  <g key={rowItemIndex} transform={`translate(${cellW * (rowItemIndex)}, 0)`} height={columns.length * cellH + nameHeight}>
                    {// v = row[i], row
                      keys && Object.keys(row).map((i) => {
                        const v = row[i];
                        const value = normalize(v);
                        const percent = (value >= max || value <= min) ? 1 : (value > 0) ? value / max : value / min;
                        return (
                          <OverlayTrigger key={i} placement="top" overlay={<Tooltip id='tooltip'>{v}</Tooltip>}>
                            <g key={i} transform={`translate(0, ${cellH * (i)})`} >
                              <rect width={cellW} height={cellH}
                                fill={value > 0 ? color(h1, l1, percent) : color(h2, l2, percent)}/>
                              <text fill={Math.abs(value) > 0.6? "white":"black" } x={cellW / 2} y={cellH / 2} fontSize={cellFontSize} textAnchor="middle" alignmentBaseline="central">{(v >= 10? v.toFixed(0) : ( v < 0.1 ? v.toFixed(2) : v.toFixed(1)))}</text>
                            </g>
                          </OverlayTrigger>);
                        }
                      )
                    }
                    {
                      <OverlayTrigger placement="top" overlay={<Tooltip id='tooltip'>{rowIndex}</Tooltip>}>
                        <text fontSize={`${nameFontSize}px`} x={cellW / 2 - (nameFontSize / 2)} y = {cellH * columns.length} 
                          transform={`rotate(90 ${cellW / 2 - (nameFontSize / 2)}, ${cellH * columns.length})`}>{/*rowIndex > 
                          maxNameCharLength ? `${rowIndex.substring(0, maxNameCharLength - 3)}...` : */ rowIndex}
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
  headerWidth: 30,
  maxNameCharLength: 22,
  nameFontSize: 11,
  normalize: (v) => Math.log2,
  max: 2,
  min: -2,
  color1: [0, 50],
  color2: [240, 50],
}

export default Chart;