import React, { Component } from 'react';
import { Alert, Button, Label, Glyphicon, Table, FormGroup, FormControl, PageHeader, Image} from 'react-bootstrap';
import { getStudyInfo, deleteExp, uploadExp, deleteStudy} from '../service/darts';
import withPage from './withPage';
import Link from 'next/link';
import cookies from 'next-cookies';
import { ScaleLoader } from 'react-spinners';
import retrieve, { sort } from '../model/record';
import Router from 'next/router';

class HowToUse extends Component {
  static async getInitialProps(ctx){

  }

  render() {
    return (
          <div style={{ marginLeft:"5%", color: "Black" }}>
              <PageHeader >How to use DARTS platform</PageHeader>
              <Image style={{width:"80%", marginLeft:"8%"}} src="/static/images/tut1.png" className='diagram'/>
              <Image style={{width:"80%", marginLeft:"8%"}} src="/static/images/tut2.png" className='diagram'/>
          </div>
      
    );
  }

}

export default withPage(HowToUse);