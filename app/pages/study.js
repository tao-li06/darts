import React, { Component } from 'react';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import { getExpList, getDrugList, deleteExp, getAllExperimentOfDrug} from '../service/darts';
import { connect } from 'react-redux';
import Page from './page';
import AddExperiment from '../components/AddExperiment';

class Experiments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drugName: '',
      list_loaded: false,
      selected: 0,
      showDetail: false,
    };
  }

  async componentWillMount() {
    if (global.window) {
      await this.fetchExperimentList();
    }
  }

  async getAllExperiment() {
    const {drugID} = this.props;
    const experimentList = await getAllExperimentOfDrug(drugID);
    return experimentList;
  }
 
  async fetchExperiment(experimentID) {
    const data = await getExpList(experimentID);
    return data;
  }

  async deleteItem(ProteinId) {
    const result = await deleteExp(ProteinId);
    if(result) {
      await this.fetchList();
    } else {
      alert('Fail to delete.');
    }
  }

   render() {
     const { list_loaded, show_upload_modal, showDetail, selected, token} = this.state;
     const { drugID } = this.props;
     return(
      <Page>
        <ListGroup >
            {
               (() => {
              const experimentGroups = [];
              const experimentList = this.getAllExperiment();
              const dataList = [];
              for(let i = 0; i < experimentList.length; i++) {
                dataList[i] = this.fetchExperiment(experimentList[i].id);
                experimentGroups.push(
                  <ListGroupItem key = {dataList[i] .id} header={dataList[i] .name} >
                  {dataList[i] .id} {dataList[i] .description}
                  </ListGroupItem>
                )
              }
              return experimentGroups;
            })()
          }
        </ListGroup>
        <AddExperiment  onAdded={async () => await this.fetchExperimentList()}/>
      </Page>
      )
    }
  }

  export default Experiments;