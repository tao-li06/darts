import React, { Component } from 'react';
import { getProteinInfo } from '../../service/uniprot';
import { persistedData } from '../../model/record';

class ProteinTitle extends Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
    }

    async componentWillMount() {
      return await this.updateInfo(this.props);
    }

    async componentWillReceiveProps(props) {
      return await this.updateInfo(props);
    }

    async updateInfo(props) {
      this.setState({ loaded: false });
      const { id } = props;
      const info = await getProteinInfo(id);
      this.setState({
        loaded: true,
        identifier: info.id,
        fullName: info.protein.recommendedName.fullName.value
      });
    }

    render() {
      const { id } = this.props;
      const { loaded, identifier, fullName } = this.state;
      if (!loaded) {
        return (
          <h4>{id}</h4>
        );
      }
      return (
        <h4>{id} ( {`${identifier} ${fullName} - ${persistedData.scores[id].toFixed(2)}` })</h4>
      );

    }
}


export default ProteinTitle;