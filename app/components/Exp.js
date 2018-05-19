import React, { Component } from 'react';
import Chart from './Chart';
import Palette from './Palette';
import ReactCardFlip from 'react-card-flip';
import { Glyphicon, Button, FormGroup, ControlLabel, ButtonGroup, FormControl, ButtonToolbar, ToggleButtonGroup, 
  ToggleButton, Label, ListGroup, ListGroupItem, Pagination, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import ProteinTitle from './ExpReportCard/PanelTitle';
import { sort } from '../model/record';


class Exp extends Component {
  state= {
    selected: 0,  
    
  }

  constructor(props) {
    super(props);
  }

  // selected = currentProteinID; 
  // orders: Map(id, dataSet);
  findID(id) {
    const { data: {orders} } = this.props;
      this.setState({selected : orders.indexOf(id), showDetails: true});
  }

  render() {
    const { itemsPerPage } = this.props;
    const { normalize, max, min, color1, color1: [h1, l1], color2, color2: [h2, l2],
      orders, items, columns } = this.props;
    const { selected } = this.state;
    const currentPage = Math.floor(selected / itemsPerPage);
    const paginationStart = Math.max(0, currentPage );
    const paginationEnd = Math.min(Math.floor((orders.length - 1) / itemsPerPage), currentPage );
    const itemStart = currentPage * itemsPerPage;
    return (
      <>
        <style jsx global>
        {``}
        </style>
        <div>
          <Col sm={2}>
              <Pagination>
                {/* <Pagination.First previous={true} onClick={() => this.setState({selected: 0})}/> */}
                <Pagination.Prev previous={true} onClick={() => {if(selected - itemsPerPage >= 0) this.setState({selected: selected - itemsPerPage})}}/>
                  {
                    (() => {
                      const children = [];
                      for(let i = paginationStart; i <= paginationEnd; i++) {
                        children.push(
                          <Pagination.Item active={i === currentPage} 
                            onClick={() => this.setState({selected: (selected + (i - currentPage) * itemsPerPage)})}>
                            {i + 1}
                          </Pagination.Item>);
                      }
                      return children;
                    })()
                  }
                  <Pagination.Next next={true} onClick={() => {if(selected + itemsPerPage <= orders.length - 1) this.setState({selected: selected + itemsPerPage})}}/>
                  {/* <Pagination.Last next={true} onClick={() => this.setState({selected: orders.length - 1})}/> */}
              </Pagination>
              <ListGroup className="ExpReportCard__list">
                  {
                    (() => {
                      const children = [];
                      const itemsEnd = Math.min(itemStart + itemsPerPage, orders.length);
                      for(let i = itemStart; i < itemsEnd; i++) {
                        children.push(
                          <ListGroupItem header={orders[i]} active={i === selected} onClick={() => this.setState({selected: i, showDetails: true})}>
                          </ListGroupItem>
                        )
                      }
                      return children;
                    })()
                  }
              </ListGroup>
            </Col>
    
            <Col sm={10}>
                <ProteinTitle className="ExpReportCard__content-title"  id={orders[selected]}/>
                <div style={{display: "flex"}}>
                  <Palette color1={color1} color2={color2} steps={5} max={max} min={min}/>
                  <Chart data={items[orders[selected]]} columns={columns} style={{width: "calc(100% - 60px)"}}
                    normalize={normalize} max={max} min={min} color1={color1} color2={color2}/>
                </div>
            </Col>
              
          </div>
      </>
      );
   }
}

Exp.defaultProps = {
  itemsPerPage: 6,
  normalize: Math.log2,
    max: 2,
    min: -2,
    color1: [0, 50],
    color2: [240, 50],
}

export default Exp;