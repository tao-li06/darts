import React, { Component } from 'react';
import Chart from '../Chart';
import Palette from '../Palette';
import ReactCardFlip from 'react-card-flip';
import { Glyphicon, Button, FormGroup, ControlLabel, ButtonGroup, FormControl, ButtonToolbar, ToggleButtonGroup, 
  ToggleButton, Label, ListGroup, ListGroupItem, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import { getExp } from '../../service/darts';
import ProteinTitle from './PanelTitle';
import { sort } from '../../model/record';
import css from 'styled-jsx/css';

const style =css `
.ExpReportCard {
display: flex;
flex-direction: column;
box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
border-radius: 10px;
border-width: 1px;
border-color: rgb(231, 231, 231);
border-style: solid;
padding: 40px;
height: 600px;
width: 1200px;
background-color: white;

}

.react-card-flipper {
width: 1200px;
}

.react-card-back {
background-color: white;
}

.react-card-front {
background-color: white;
}

.ExpReportCard__brief {
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
}

.ExpReportCard__list {
width: 600px;
}

.ExpReportCard__nav {
display: flex;
width: 100%;
flex-direction: row;
}

.ExpReportCard__nav-center {
display: flex;
flex: 1;
justify-content: center;
}

.ExpReportCard__content-container {
padding: 0px;
display: flex;
flex-direction: column;
flex: 1;
}

.ExpReportCard__content-title {
text-align: center;
padding-top: 0px;
padding-bottom: 0px;
margin-top: 10px;
margin-bottom: 10px;
width: 100%;
font-size: 28px;
}`;


class ExpReportCard extends Component {
  state= {
    selected: 0,  
    normalize: Math.log2,
    max: 2,
    min: -2,
    color1: [0, 50],
    color2: [240, 50],
    showDetails: false,
    loaded: false,
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    const { selected, showDetails, data: { orders } } = this.state;
    if ((e.keyCode == 37 || e.keyCode == 33) && selected > 0) {
      this.setState({selected: selected - 1});
    } else if ((e.keyCode == 39 || e.keyCode == 34) && selected < orders.length - 1) {
      this.setState({selected: selected + 1});
    } else if (e.keyCode == 13 && selected >= 0 && selected < orders.length && !showDetails) {
      this.setState({ showDetails: true});
    }
  }
  // selected = currentProteinID; 
  // orders: Map(id, dataSet);
  findID(id) {
    const { data: {orders} } = this.state;
      this.setState({selected : orders.indexOf(id), showDetails: true});
  }

  async componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
    if (global.window) {
      const { token, id } = this.props;
      const json = await getExp(token, id);
      const orders = sort(json.data);
      this.setState({
        data: {
          items: json.data,
          columns: json.headers,
          orders
        },
        loaded: true
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
    
  }


  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return (
        <div className="ExpReportCard">
          <style jsx global>{style}</style>
          <CircleLoader color="green"/>
        </div>
      );
    }
    const { itemsPerPage } = this.props;
    const { showDetails, selected, normalize, max, min, color1, color1: [h1, l1], color2, color2: [h2, l2],
      data, data: { orders, items, columns } } = this.state;
    const currentPage = Math.floor(selected / itemsPerPage);
    const paginationStart = Math.max(0, currentPage - 3);
    const paginationEnd = Math.min(Math.floor((orders.length - 1) / itemsPerPage), currentPage + 3);
    const itemStart = currentPage * itemsPerPage;
    return (
      <>
        <style jsx global>
        {style}
        </style>
        <ReactCardFlip isFlipped={showDetails} style={{width: "1200px"}}>
          <div key="front" className="ExpReportCard">
            <div className="ExpReportCard__nav">
            <div className="ExpReportCard_SearchDialogue" >
                  
                    
            </div>
              <div style={{flex: "1", justifyContent: "center", display: "flex"}}>
              <Button bsSize="large" bsStyle="link" disabled={!data} onClick={() => this.setState({showDetails: true})}>
                  <Glyphicon glyph="th"/>
                </Button>

                <Button bsSize="large" bsStyle="link" onClick={this.props.onClose}>
                  <Glyphicon glyph="folder-open"/>
                </Button>
                <Button bsSize="large" bsStyle="link" disabled={!data} onClick={()=>{
                   const { data: {orders}, name} = this.state;
                   if(orders.indexOf(name) != -1)
                      this.setState({selected : orders.indexOf(name), showDetails: true});
                      else {
                        alert("Protein ID not found");
                      }
                  }}>
                  <Glyphicon glyph="search"/>
                </Button>
              <FormGroup controlId="searchName">
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Search by Protein ID"
                  onChange={(e) => this.setState({name: e.target.value})}
                  />
              </FormGroup>
                

              </div>
            </div>
            <div className="ExpReportCard__brief">
              <Pagination>
                <Pagination.First previous={true} onClick={() => this.setState({selected: 0})}/>
                <Pagination.Prev previous={true} onClick={() => {if(selected - itemsPerPage >= 0) this.setState({selected: selected - itemsPerPage})}}/>
                <Pagination.Ellipsis />

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

                <Pagination.Ellipsis />
                <Pagination.Next next={true} onClick={() => {if(selected + itemsPerPage <= orders.length - 1) this.setState({selected: selected + itemsPerPage})}}/>
                <Pagination.Last next={true} onClick={() => this.setState({selected: orders.length - 1})}/>
              </Pagination>
              <ListGroup className="ExpReportCard__list">
                {
                  (() => {
                    const children = [];
                    const itemsEnd = Math.min(itemStart + itemsPerPage, orders.length);
                    for(let i = itemStart; i < itemsEnd; i++) {
                      children.push(
                        <ListGroupItem header={orders[i]} active={i === selected} onClick={() => this.setState({selected: i, showDetails: true})}>
                          {'Description'}
                        </ListGroupItem>
                      )
                    }
                    return children;
                  })()
                }
              </ListGroup>
            </div>
          </div>
          
          <div className="ExpReportCard" key="back">
            <div className="ExpReportCard__nav">
              <Button bsSize="large" bsStyle="link" disabled={selected == 0 } onClick={() => {
                this.setState({selected: selected - 1})
                }}>
                <Glyphicon glyph="chevron-left" />
              </Button>
              <div className="ExpReportCard__nav-center">
                <Button bsSize="large" bsStyle="link" disabled={!data} onClick={() => this.setState({showDetails: false})}>
                  <Glyphicon glyph="th-list"/>
                </Button>
                
              </div>
              <Button bsSize="large" bsStyle="link" disabled={selected >= orders.length - 1} 
                onClick={() => this.setState({selected: selected + 1})}>
                <Glyphicon glyph="chevron-right"/>
              </Button>
            </div>
            <div className="ExpReportCard__content-container">
              <ProteinTitle className="ExpReportCard__content-title"  id={orders[selected]}/>
              <div style={{display: "flex", flexDirection: "row", width: "80vw"}}>
                <Palette color1={color1} color2={color2} steps={5} max={max} min={min}/>
                <Chart style={{width: "calc(100% - 120px)"}} data={items[orders[selected]]} columns={columns}
                  normalize={normalize} max={max} min={min} color1={color1} color2={color2}/>
              </div>
            </div>
            
          </div>
        </ReactCardFlip>
      </>
      );
   }
}

ExpReportCard.defaultProps = {
  itemsPerPage: 6,
}

export default connect(state => ({token: state.user.token}))(ExpReportCard);