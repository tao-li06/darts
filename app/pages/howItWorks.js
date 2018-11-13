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
          
            <div style={{ color: "black" }}>
                <PageHeader >The Principle of Drug Affinity Responsive Target Stability (DARTS) Method</PageHeader>
                <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>
                  <header style={{ fontSize: "18pt"}}> The Principle of DARTS</header> 
                  <a href='http://www.pnas.org/content/106/51/21984'> (http://www.pnas.org/content/106/51/21984) </a>
                  <p/>
                  <br/>
                  <p>
                    DARTS takes advantages of a reduction in the protease susceptibility of the target protein upon drug binding. When bound by drugs, target proteins show different protease digestions rates and this difference can be measured using semi-quantitive or quantitive methods such as western blot and mass spectrometry. 
                  </p>
                  <br/>
                  <p>
                    Our patented DARTS technology identifies the binding targets of small molecule drugs and compounds. DARTS represents a paradigm 
                    change without the need for modification, immobilization, or purification of the small molecule or the compound’s biological 
                    activity, providing proteome-wide, sample specific analysis of drug-target interactions at protein substructure levels. 
                  </p>
                  <br/>
                  <p>
                  DARTS can be used for various applications, including proteome-wide drug target identifications, target analysis of compounded drugs, 
                    personalized medicine, and drug repurposing/side effect predictions.  
                  </p>
                  <br/>
                </div>
            </div>
          <Image style={{ width: "70%" }} src="/static/images/darts-diagram.jpeg"/>
          <br/>
          <div style={{ color: "black" }}>
                <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>

                  <br/>
                  <header style={{ fontSize: "18pt"}}> DARTS Applications</header>
                  <p/>
                  <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Advanced drug screening and target identifications. 
                  </p>
                  <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Drug resistance studies and personalized medicine. 
                  </p>
                  <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Drug quality assessment, compound drug analysis and MORE!
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