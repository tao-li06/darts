import React, { Component } from 'react';
import {getProteinInfo} from '../service/uniprot';

class ProteinName extends Component {
  constructor(props){
    super(props);
    this.getProteinInfo = this.getProteinInfo.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      displayedInfo:[],
    }
  }

  getProteinInfo = async (id) => {
      const res = await fetch(`https://www.ebi.ac.uk/proteins/api/proteins/${id.trim()}`,
        { headers: { "Accept": "application/json" }}
      );
      const json = await res.json();
      return json;
  }

  async update(props) {
    const proteinIDs = props.proteinIDs;
    const IDarray = proteinIDs.split(';').map( i => i.trim());
    var fullDisplay = [];
    for(let i = 0; i < IDarray.length; i++ ) {
      fullDisplay[i] = {
        id: IDarray[i],
        name: (await this.getProteinInfo(IDarray[i])).protein.recommendedName.fullName.value
      };
    }
    this.setState({ displayedInfo : fullDisplay });
  }

  async componentWillMount() {
    await this.update(this.props);
  }

  async componentWillReceiveProps(props) {
    await this.update(props);
  }

  render() {
    const { displayedInfo } = this.state; 
    return (
      <div>
      {
        displayedInfo.map((d) => {
          return <a key={d.id} href={`https://www.uniprot.org/uniprot/${d.id}`} target="_blank">[{d.id} : {d.name}]  </a>;
        })
      }
      </div>
    );
    


  }

}
export default ProteinName;