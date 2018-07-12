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
      const proteinJSON = (await this.getProteinInfo(IDarray[i]));
      fullDisplay[i] = {
        id: IDarray[i],
        ID: proteinJSON.id,
        name: proteinJSON.protein && proteinJSON.protein.recommendedName ? 
          ("RecommendedName: ") + proteinJSON.protein.recommendedName.fullName.value : 
          (proteinJSON.submittedName && proteinJSON.submittedName[0].fullName ? 
            ("SubmittedName: ") + proteinJSON.submittedName[0].fullName.value : "Cannot get name"),
        shortname: proteinJSON.protein && proteinJSON.protein.recommendedName && proteinJSON.protein.recommendedName.shortName ? 
          ("ShortName: ") + proteinJSON.protein.recommendedName.shortName[0].value : "-",
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
        return (<a key={d.id} target="_blank"  href={`https://www.uniprot.org/uniprot/${d.id}`} >[{d.id}] [{d.ID}] [{d.name}] [{d.shortname}]<br/>  </a>);
        })
      }
      </div>
    );
    


  }

}
export default ProteinName;