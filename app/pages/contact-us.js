import React, { Component } from 'react'; 
import withLogin from './withLogin';
import { PageHeader, Image } from 'react-bootstrap';

class ContactUs extends Component {
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
            <PageHeader >Contact Us</PageHeader>
            <div style={{ fontSize: "14pt", fontFamily:"helvetica neue"}}>
            <p style={{ fontSize: "18pt"}}> Investors, Business, Collaborations:   </p>
            <br />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dr. Jing Huang </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Professor, Department Of Molecular and Medical Pharmacology</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tel: (310) 825-4321 </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Address: CHS 23-231, 650 Charles E Young Dr S, Los Angeles, CA 90025 </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: jinghuang.ucla@gmail.com </p>
            <br/>
            <br />
            <p style={{ fontSize: "18pt"}}>Technical Support</p>
            <br />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Xiang Yin </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tel: (310) 307-9215 </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: xiangyin701@gmail.com </p>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
      </div>
    
    </React.Fragment>
    )
  }

}


export default withLogin(ContactUs);