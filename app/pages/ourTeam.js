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
      
        <div style={{ color: "black" }}>
            <PageHeader >About Jing Huang Lab 
              </PageHeader>
            <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>
            <header style={{ fontSize: "18pt"}}> Research Areas</header>
            <br/>
            <p> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. The target of rapamycin (TOR) signaling network: new interacting pathways, regulations, and drugs in cancer, aging and related areas (metabolic syndrome, neurodegenerative diseases, etc)
            <p>
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. Technology/method development: label-free small-molecule target identification, protein-ligand interaction, chemical genomics and proteomics, functional analysis
            <p>
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. Molecular and cellular mechanisms of anti-cancer and anti-aging natural products (mainly focusing on mechanisms for cancer prevention, cardioprotection, neuroprotection and immune modulation)
            <p>
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. New anti-aging mechanisms and therapeutic strategies
            <p>
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5. Human variation, disease modifiers, and personalized drug discovery
            </p>
            <br/>
            <header style={{ fontSize: "18pt"}}> Lab Members</header>
            <br/>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Xiang Yin  Ph.D. student 
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Min Chai  Ph.D. student 
            </p>
            <br/>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Past members: 
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Brett Lomenick  Ph.D 
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Xudong Fu  Ph.D
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Melody Pai  Ph.D
            </p>
            <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Randall Chin  Ph.D
            </p>
          </div>
        </div>
      <br/>
      
      
    
    </React.Fragment>
    )
  }

}


export default withLogin(OurTeam);