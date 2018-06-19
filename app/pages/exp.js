import React, { Component } from 'react';
import { Table, Glyphicon, Label, Pagination, Badge, Button, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import { getExp } from '../service/darts';
import cookies from 'next-cookies';
import withPage from './withPage';
import { sort } from '../model/record';
import Chart from '../components/Chart';
import Palette from '../components/Palette';
import ProteinName from './proteinName';

class Exp extends Component {
  static async getInitialProps(ctx) {
    const { token } = cookies(ctx);
    const { asPath, req, res } = ctx;
    const id = req.params.id;
    const studyId = req.params.studyId;
    const exp = await getExp(studyId, id, token);
    if (!exp) {
      return { error: 404 };
    } else {
      const orders = sort(exp.data, 'median');
      return {
        id,
        studyId,
        exp,
        orders
      };
    }
    this.rankScore = this.rankScore.bind(this);

  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selected: 0,
      value:''
    }
  }

  medianScore(dataSet) {
    var score = 0.0;
    var numOfTotalDP = 1.0;
    var nums = [];
    const keys = Object.keys(dataSet);
    for( var i  = 0; i < keys.length; i++) {
      const seq = dataSet[keys[i]];
      const ikeys = Object.keys(seq);
      for( var j  = 0; j < ikeys.length; j++) {
        const value = seq[ikeys[j]];
        if(value <= 50 && value >= 0.02)
          nums.push(value);
        numOfTotalDP ++;
      }
    }
    nums.sort(function(a, b){return a-b});
    var median = Math.floor(nums.length / 2);
    if(nums.length <= 3)
      score = 0.0;
    else score = nums.length % 2 === 0? (nums[nums.length/2 - 1] + nums[nums.length/2])/2 : nums[(nums.length - 1)/2];
    return score.toFixed(3);
  }

  rankScore (dataSet) {
    var score = 0.0;
    var numOfTotalDP = 1.0;
    var numOfValidDP = 0.0;
    var numOfSubunits = 1.0;
    const keys = Object.keys(dataSet);
    for( var i  = 0; i < keys.length; i++) {
      const seq = dataSet[keys[i]];
      const ikeys = Object.keys(seq);
      numOfSubunits ++;
      for( var j  = 0; j < ikeys.length; j++) {
        const value = seq[ikeys[j]];
        const sign = value > 1 ? 1 : -1;
        if(value > 10)
          score += 1;
        else if(value < 0.1)
          score -= 1;
        else if(value < 0.8 || value > 1.2)
          score += value - 1;
        numOfTotalDP ++;
        numOfValidDP += sign;
      }
    }
    if(Math.abs(numOfValidDP) < 3)
      score = 0;
    return (score/numOfTotalDP).toFixed(3);
  }

  onKeyDown(e) {
    const { selected } = this.state;
    const { orders } = this.props;
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
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick(props) {
    const {value} = this.state;
    const {orders} = this.props;
    let ind = orders.indexOf(value);
    if(ind != -1)
    this.setState({ selected : ind});
  }


  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  render() {
    
    const { orders, exp: {name, label, description, headers, data}, itemsPerPage,
      normalize, max, min, color1, color1: [h1, l1], color2, color2: [h2, l2] } = this.props;
    const { selected } = this.state;
    const currentPage = Math.floor(selected / itemsPerPage);
    const paginationStart = Math.max(0, currentPage - 8);
    const paginationEnd = Math.min(Math.floor((orders.length - 1) / itemsPerPage), currentPage + 8);
    const itemStart = currentPage * itemsPerPage;
    const proteinID = ' ; ';
    return (
      <div className="container">
        <style jsx global>{
          `
          th {
            vertical-align: middle !important;
          }
          .form-group {
            margin-bottom: unset;
          }
          .table-responsive {
            margin-top: 40px;
          }
          .external-link {
            padding-right: 10px;
          }
          `
        }</style>
        <h3>
          <Glyphicon style={{color: "Turquoise"}} glyph="object-align-bottom"/>
          &nbsp;&nbsp;{name}&nbsp;&nbsp;
          {
            label && label.split(',').map((l, i) => <Label key={i}>{l}</Label>)
          }
          <FormGroup style={{float:"right", width:"150pt", marginRight:"30pt"}}>
            <InputGroup>
              <FormControl type="text" value={this.state.value}  placeholder="Enter text"  onChange={this.handleChange}/>
              <InputGroup.Button>
                <Button onClick={this.handleClick}>
                  <Glyphicon glyph="search"/>
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </h3>
        <p className="lead">{description}</p>
        <div className="container" style={{textAlign: "center"}}>
          <h3><Label>{selected}</Label>&nbsp;<Label bsStyle="info">{orders[selected]}</Label></h3>
          <ProteinName proteinIDs={orders[selected]}/>
          <p> Median* = {this.medianScore(data[orders[selected]])} Rankscore = {this.rankScore(data[orders[selected]])}</p>   
        </div>

        <div style={{display: "flex", flexDirection: "row", paddingLeft: "20px", paddingRight: "20px"}}>
          <Palette color1={color1} color2={color2} steps={5} max={max} min={min}/>
          <Chart style={{width: "calc(100% - 60px)"}} data={data[orders[selected]]} columns={headers}
            normalize={normalize} max={max} min={min} color1={color1} color2={color2}/>
        </div>
        <Table hover condensed  striped responsive>
          <thead>
            <tr>
              <th style={{width: "5%"}}>#</th>
              <th style={{width: "30%"}}>Identifier</th>
              <th style={{width: "35%"}}>Details</th>
              <th style={{width: "30%"}}>Link</th>
            </tr>
          </thead>
          <tbody>
          {
            (() => {
              const children = [];
              const itemsEnd = Math.min(itemStart + itemsPerPage, orders.length);
              for(let i = itemStart; i < itemsEnd; i++) {
                children.push(
                  <tr key={i} style={ i === selected ? { background: "lightblue"} : null }>
                    <th><Badge>{i}</Badge></th>
                    <th  onClick={() => this.setState({selected: i, showDetails: true})}><Button bsStyle="link">{orders[i]}</Button></th>
                    <th/>
                    <th>
                      {
                        orders[i] && orders[i].split(';').map((p, i) => <a key={i} className="external-link" target="_blank" href={`https://www.uniprot.org/uniprot/${p.trim()}`}>{p}</a>)
                      }
                    </th>
                  </tr>
                )
              }
              return children;
            })()
          }
          </tbody>
        </Table>
        <div style={{textAlign: "center"}}>
          <Pagination style={{marginLeft: "auto", marginRight: "auto"}}>
            <Pagination.First previous="true" onClick={() => this.setState({selected: 0})}/>
            <Pagination.Prev previous="true" onClick={() => {if(selected - itemsPerPage >= 0) this.setState({selected: selected - itemsPerPage})}}/>
            <Pagination.Ellipsis />

            {
              (() => {
                const children = [];
                for(let i = paginationStart; i <= paginationEnd; i++) {
                  children.push(
                    <Pagination.Item key={i} active={i === currentPage} 
                      onClick={() => this.setState({selected: (selected + (i - currentPage) * itemsPerPage)})}>
                      {i + 1}
                    </Pagination.Item>);
                }
                return children;
              })()
            }

            <Pagination.Ellipsis />
            <Pagination.Next next="true" onClick={() => {if(selected + itemsPerPage <= orders.length - 1) this.setState({selected: selected + itemsPerPage})}}/>
            <Pagination.Last next="true" onClick={() => this.setState({selected: orders.length - 1})}/>
          </Pagination>
        </div>
      </div>
    );
  }
}

Exp.defaultProps = {
  itemsPerPage: 15,
  selected: 0,  
  normalize: Math.log2,
  max: 2,
  min: -2,
  color1: [0, 50],
  color2: [240, 50],
}

export default withPage(Exp);