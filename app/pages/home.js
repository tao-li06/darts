import { Component } from 'react';
import withLoginHome from './withLoginHome';
import Particles from 'react-particles-js';

class Home extends Component {
  render() {
    return(
        <div style={{ height: "100vh", backgroundImage: "url(/static/images/dartsbackground.jpg)"}}>
                    <Particles/>
        </div>
    );
  }
}

export default withLoginHome(Home);
