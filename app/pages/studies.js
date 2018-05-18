import React, { Component } from 'react';
import { Navbar, Glyphicon, Nav, NavItem, ListGroup, ListGroupItem, Breadcrumb, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudyList, uploadStudy, deleteStudy, endpoint} from '../service/darts';
import Router from 'next/router'
import UploadModal from '../components/Library/UploadModal';
import Page from './page';
import { SyncLoader} from 'react-spinners';
import AddStudy from '../components/AddStudy';

//Home Page for client, provide a list of drug names in the ListGroup;

class homepage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeNavKey: 1,
        selected: -1,
        showDetails: false,
        show_upload_modal: false,
        list_loaded: false,
      };
  }
    // check the login state
  async componentWillMount(){
    if(global.window) {
      await this.fetchList();
    }
  }

  async fetchList() {
    this.setState({ list_loaded: false});
    const data = await getStudyList();
    this.setState({data, list_loaded: true});
  }

  async deleteAStudy(id) {
    const result = await deleteStudy(id);
    if(result) {
      await this.fetchList();
    } else {
      alert('Fail to delete.');
    }
  }
  
  render(){
    const { list_loaded, data, selected } = this.state;
    const { length, token } = this.props;
    if(!list_loaded) {
      return(
        <Page>
          <div style={{display: "flex", justifyContent: "center"}}>
            <SyncLoader color="#4A90E2" >
            </SyncLoader>
          </div>
        </Page>
      );
    } 
    return(
      <>
      <Page>
        <ListGroup style={{margin:"auto", width:"750px"}} >
          {
            data.map((study) => (
              <>
                <ListGroupItem header={study.name} onClick = {()=> Router.push(`/studies/${study.id}`) } >
                  {study.description}{study.label}
                  <div style={{textAlign : "right"}} >
                  <Button onClick={async (e) => {e.stopPropagation();
                    await this.deleteAStudy(study.id)}} >
                    <Glyphicon glyph="trash" style={{color:"Grey"}}/>
                  </Button>
                  </div>
                </ListGroupItem>

               </>
            ))
          }
          <AddStudy  onAdded={async () => await this.fetchList()}/>
        </ListGroup>    
      </Page>
      </>
    );
  }
}

export default homepage;