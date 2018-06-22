import React, { Component } from 'react'; 
import withLogin from './withLogin';
import { PageHeader, Image } from 'react-bootstrap';

class OurTeam extends Component {
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
            <PageHeader >Our Team</PageHeader>
            <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>
            <header style={{ fontSize: "16pt"}}> JING HUANG, Ph.D.</header>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Co-Founder, Chair of Scientific Advisory Board
            </p>
            <br/>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;· Professor of Molecular and Medical Pharmacology at the David Geffen School of Medicine at UCLA
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;· Member of Jonsson Comprehensive Cancer Center at UCLA
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;· Founder of LongLifeRx Inc and DARTS Sciences Inc
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;· Inventor of the DARTS (Drug Affinity Responsive Target Stability) technology.
            </p>
            <br/>
          </div>
        </div>
      <br/>
      <div style={{ color: "#ededed" }}>
          <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>
            <header style={{ fontSize: "16pt"}}> BRETT LOMENICK, Ph.D.</header>
            <p/>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Co-Founder, Chief Technology Officer
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Spearheaded the development of the Drug Affinity Responsive Target Stability (DARTS) method for small molecule target identification.
            </p>
          </div>
      </div>
    
    </React.Fragment>
    )
  }

}


export default withLogin(OurTeam);