import React, { Component } from 'react';
import { Alert, Button, Label, Glyphicon, Table, FormGroup, FormControl, PageHeader, Image} from 'react-bootstrap';
import { getStudyInfo, deleteExp, uploadExp, deleteStudy} from '../service/darts';
import withLogin from './withLogin';
import Link from 'next/link';
import cookies from 'next-cookies';
import { ScaleLoader } from 'react-spinners';
import retrieve, { sort } from '../model/record';
import Router from 'next/router';

class HowToUse extends Component {

  render() {
    return (
          <div style={{ marginLeft:"5%", color: "Black", fontSize:"14pt" }}>
              <PageHeader style={{fontSize:"18pt"}}>User Guide</PageHeader>
              <p>
                The DARTS Platform is a customized data analysis and management platform for Drug-Protein Interaction profiling. The platform processes experimental results of DARTS method and visualize proteome-wide drug-protein interactions. 
                <p><br /></p>
                For guidances or experiment protocols of unbiased-DARTS, please refer to our previous publications or contact Dr. Jing Huang at jinghuang.ucla@gmail.com. 
                <p><br /></p>
                To obtain free access to the platform, please contact Xiang Yin at xiangyin701@gmail.com.
              </p>
              <br />
              <Image style={{width:"80%", marginLeft:"8%"}} src="/static/images/tut1.png" className='diagram'/>
              <br />
              <Image style={{width:"80%", marginLeft:"8%"}} src="/static/images/tut2.png" className='diagram'/>
              <br />
              <br />
              <br />
              <p style={{fontSize:"18pt"}}>
                Related publications: </p><p style={{fontSize:"14pt"}}>
                <br />
                 1. Original DARTS protocol: <br /><a href='http://www.pnas.org/content/106/51/21984'>Target identification using drug affinity responsive target stability (DARTS) PNAS(2009)</a>
                 <br /><br />
                 
                 2. Unbiased DARTS protocol:<br /><a href='http://www.pnas.org/content/106/51/21984'>Drug Affinity Responsive Target Stability (DARTS) for Small Molecule Target Identification Methods Mol Biol(2016)</a>

              </p>
              <br />
              <br />
              <br />
              <br />
          </div>
      
    );
  }

}

export default withLogin(HowToUse);