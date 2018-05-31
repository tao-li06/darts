import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Glyphicon, Label, Pagination, Badge, Button } from 'react-bootstrap';
import { getExp } from '../service/darts';
import cookies from 'next-cookies';
import withPage from './withPage';
import { sort } from '../model/record';
import Chart from '../components/Chart';
import Palette from '../components/Palette';
import Link from 'next/link';
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
      const orders = sort(exp.data);
      return {
        id,
        studyId,
        exp,
        orders
      };
    }
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.findID = this.findID.bind(this);
    this.state = {
      selected: 0
    }
  }

  onKeyDown(e) {
    const { selected} = this.state;
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
  findID(id) {
    const { data: {orders} } = this.state;
      this.setState({selected : orders.indexOf(id), showDetails: true});
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
        </h3>
        <p className="lead">{description}</p>
        <p>The chart presents the data for each protein in heatmap, scroll on the chart to see extra data. Use left/right key to navigate to previous/next protein, or select protein from the list below.</p>
        <div className="container" style={{textAlign: "center"}}>
          <h3><Label>{selected}</Label>&nbsp;<Label bsStyle="info">{orders[selected]}</Label></h3>
          <ProteinName proteinIDs={orders[selected]}/>   
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