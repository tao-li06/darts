import React, { Component } from 'react'; 
import withLogin from './withLogin';
import { PageHeader, Image } from 'react-bootstrap';

class HowItWorks extends Component {
    render() {
      return (
        <React.Fragment>
          <style jsx global>{
            `
            .diagram {
              width: 100%;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
              display: block;
            }
            
            `
          }
          </style>
          
            <div style={{ color: "white" }}>
                <PageHeader >How It Works</PageHeader>
                <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>
                  <header style={{ fontSize: "16pt"}}> Principle of DARTS</header>
                  <p/>
                  <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our patented DARTS technology identifies the binding targets of small molecule drugs and compounds.  DARTS represents a paradigm 
                    change without the need for modification, immobilization, or purification of the small molecule 
                    or the compound’s biological activity.
                  </p>
                  <br/>
                </div>
            </div>
          <Image style={{width:"400px"}} src="/static/images/darts-diagram.jpeg" className='diagram'/>
          <br/>
          <div style={{ color: "#ededed" }}>
                <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>
                  <header style={{ fontSize: "16pt"}}> DARTS Applications</header>
                  <p/>
                  <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Advanced drug screening and target identifications. 
                  </p>
                  <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Drug resistance studies and precision medicine. 
                  </p>
                  <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Drug composition and quality assessment.
                  </p>
                  <br/>
                  <br/>
                  <br/>
                </div>
            </div>
        
        </React.Fragment>
      );
    }
}

export default withLogin(HowItWorks);