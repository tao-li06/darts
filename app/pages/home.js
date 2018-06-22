import { Component } from 'react';
import withLogin from './withLogin';
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

export default withLogin(Home);
