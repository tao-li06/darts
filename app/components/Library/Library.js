import React, { Component } from 'react';
import { Glyphicon, Button, ButtonGroup, ButtonToolbar, ToggleButtonGroup, 
  ToggleButton, Label, ListGroup, ListGroupItem, Pagination } from 'react-bootstrap';
import { getExpList } from '../../service/darts';
import { GridLoader } from 'react-spinners';
import { connect } from 'react-redux';
import UploadModal from './UploadModal';
import ExpReportCard from '../ExpReportCard';
import "isomorphic-fetch";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_loaded: false,
      show_upload_modal: false,
      selected: 0,
      showDetail: false,
    };
    this.fetchList = this.fetchList.bind(this);
  }

  async componentWillMount() {
    if (global.window) {
      await this.fetchList();
    }
  }

  async fetchList() {
    const { token } = this.props;
    this.setState({ list_loaded: false});
    const data = await getExpList(token);
    this.setState({data, list_loaded: true});
  }

  

  renderList() {
    const { list_loaded, data, selected } = this.state;
    if (!list_loaded) {
      return <GridLoader color="green"/>;
    } else {
      const { itemsPerPage } = this.props;
      const currentPage = Math.floor(selected / itemsPerPage);
      const paginationStart = Math.max(0, currentPage - 3);
      const paginationEnd = Math.min(Math.floor((data.length - 1) / itemsPerPage), currentPage + 3);
      const itemStart = currentPage * itemsPerPage;
      return (
          
          <ListGroup className="library__list">
            {
              (() => {
                const children = [];
                const itemsEnd = Math.min(itemStart + itemsPerPage, data.length);
                for(let i = itemStart; i < itemsEnd; i++) {
                  children.push(
                    <ListGroupItem header={data[i].name} active={i === selected} onClick={() => this.setState({selected: i, showDetail: true})}>
                    
                    </ListGroupItem>
                  )
                }
                return children;
              })()
            }
          </ListGroup>
      
      )
    }
  }

 

  render() {
    const { list_loaded, data, show_upload_modal, showDetail, selected } = this.state;
    if (showDetail) {
      return (
        <div className="library">
          <style jsx global>{`.library {
  min-height: 90vh;
  min-width: 90wh;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}

.library__list {
  width: 600px;
}`}</style>
          <ExpReportCard id={data[selected].id} onClose={() => this.setState({ showDetail: false})}/>
      </div>);
    }
    return (
      <div className="library">
        <style jsx global>{`.library {
  min-height: 90vh;
  min-width: 90wh;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}

.library__list {
  width: 600px;
}`}</style>
        <div>
          <Button onClick={() => this.setState({show_upload_modal: true})}>Upload</Button>
        </div>
        <UploadModal show={show_upload_modal} onClose={(async (uploaded) => {
          
          this.setState({show_upload_modal: false});
          if (uploaded) {
            await this.fetchList();
          }
        }).bind(this)}/>
        {this.renderList()}
      </div>
      
    );
  }
}

Viewer.defaultProps = {
  itemsPerPage: 6
}

export default connect(state => ({token: state.user.token}))(Viewer);
